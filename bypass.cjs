const http = require('http');
const https = require('https');
const vm = require('vm');

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ data, headers: res.headers, statusCode: res.statusCode }));
    });
    req.on('error', reject);
  });
}

function solveChallenge(html, aesJs) {
  // Parse variables from HTML
  const aMatch = html.match(/var a=toNumbers\("([a-f0-9]+)"\)/);
  const bMatch = html.match(/b=toNumbers\("([a-f0-9]+)"\)/);
  const cMatch = html.match(/c=toNumbers\("([a-f0-9]+)"\)/);
  
  if (!aMatch || !bMatch || !cMatch) {
    return null;
  }
  
  const aHex = aMatch[1];
  const bHex = bMatch[1];
  const cHex = cMatch[1];
  
  // Set up execution context
  const context = {
    document: {}
  };
  vm.createContext(context);
  
  // Run aes.js
  vm.runInContext(aesJs, context);
  
  // Run extraction code
  const code = `
    function toNumbers(d){var e=[];d.replace(/(..)/g,function(d){e.push(parseInt(d,16))});return e}
    function toHex(){for(var d=[],d=1==arguments.length&&arguments[0].constructor==Array?arguments[0]:arguments,e="",f=0;f<d.length;f++)e+=(16>d[f]?"0":"")+d[f].toString(16);return e.toLowerCase()}
    var a=toNumbers("${aHex}"),b=toNumbers("${bHex}"),c=toNumbers("${cHex}");
    document.cookie="__test="+toHex(slowAES.decrypt(c,2,a,b))+"; max-age=21600; expires=Thu, 31-Dec-37 23:55:55 GMT; path=/";
  `;
  vm.runInContext(code, context);
  
  return context.document.cookie.split(';')[0];
}

async function run() {
  try {
    const targetUrl = 'https://mendes.xo.je/wp-json/mcp/novamira';
    console.log('1. Fetching target page first to get challenge HTML...');
    const firstRes = await get(targetUrl);
    
    console.log('2. Fetching aes.js...');
    const { data: aesJs } = await get('https://mendes.xo.je/aes.js');
    
    const cookie = solveChallenge(firstRes.data, aesJs);
    if (!cookie) {
      console.log('No challenge found, maybe already bypassed?');
      return;
    }
    console.log('Solved challenge! Cookie:', cookie);
    
    // Authorization headers and Cookie
    const auth = Buffer.from('mendes_admin:PAKiy4fvUuPLY4HPTAF0iX4z').toString('base64');
    const headers = {
      'Cookie': cookie,
      'Authorization': `Basic ${auth}`,
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    
    // 3. Request redirect URL (which completes the challenge in InfinityFree)
    const redirectUrl = 'https://mendes.xo.je/wp-json/mcp/novamira?i=1';
    console.log('3. Requesting redirect URL to activate cookie:', redirectUrl);
    const redirectRes = await get(redirectUrl, headers);
    
    console.log('Redirect Status Code:', redirectRes.statusCode);
    
    // 4. Request the main endpoint again
    console.log('4. Requesting original endpoint with activated cookie...');
    const result = await get(targetUrl, headers);
    console.log('Final Status Code:', result.statusCode);
    console.log('Final Response Body:', result.data);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
