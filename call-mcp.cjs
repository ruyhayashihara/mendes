const { spawn } = require('child_process');

console.log('Spawning MCP WordPress server...');
const mcp = spawn('/home/ruy-ubuntu/.hermes/node/bin/node', [
  '/home/ruy-ubuntu/.hermes/node/lib/node_modules/npm/bin/npx-cli.js',
  '-y',
  '@automattic/mcp-wordpress-remote@latest'
], {
  env: {
    ...process.env,
    PATH: '/home/ruy-ubuntu/.hermes/node/bin:' + process.env.PATH,
    WP_API_URL: "https://mendes.xo.je/wp-json/mcp/novamira",
    WP_API_USERNAME: "mendes_admin",
    WP_API_PASSWORD: "PAKiy4fvUuPLY4HPTAF0iX4z"
  }
});

let outBuffer = '';
mcp.stdout.on('data', data => {
  outBuffer += data.toString();
  const lines = outBuffer.split('\n');
  outBuffer = lines.pop();
  
  for (const line of lines) {
    if (line.trim()) {
      try {
        const msg = JSON.parse(line);
        console.log('Received JSON:', JSON.stringify(msg, null, 2));
      } catch (e) {
        console.log('Raw OUT:', line);
      }
    }
  }
});

mcp.stderr.on('data', data => {
  console.error('STDERR:', data.toString());
});

mcp.on('close', (code) => {
  console.log(`MCP process exited with code ${code}`);
});

const sendJson = (obj) => {
  console.log('Sending:', JSON.stringify(obj));
  mcp.stdin.write(JSON.stringify(obj) + '\n');
};

// Step 1: Initialize
sendJson({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test-client", version: "1.0.0" }
  }
});

// Step 2: Send initialized notification and list tools
setTimeout(() => {
  sendJson({
    jsonrpc: "2.0",
    method: "notifications/initialized"
  });
  
  sendJson({
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list"
  });
}, 2000);

// Keep alive to read responses, then exit
setTimeout(() => {
  console.log('Closing MCP...');
  mcp.kill();
  process.exit(0);
}, 10000);
