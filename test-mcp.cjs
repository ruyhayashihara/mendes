const { spawn } = require('child_process');

const mcp = spawn('npx', ['-y', '@automattic/mcp-wordpress-remote@latest'], {
  env: {
    ...process.env,
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
        console.log('Received:', JSON.stringify(msg, null, 2));
      } catch (e) {
        console.log('Raw OUT:', line);
      }
    }
  }
});

mcp.stderr.on('data', data => console.error('ERR:', data.toString()));

const init = {
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test-client", version: "1.0.0" }
  }
};
console.log('Sending initialize...');
mcp.stdin.write(JSON.stringify(init) + '\n');

setTimeout(() => {
  const initialized = {
    jsonrpc: "2.0",
    method: "notifications/initialized"
  };
  mcp.stdin.write(JSON.stringify(initialized) + '\n');
  
  console.log('Sending tools/list...');
  const listTools = {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list"
  };
  mcp.stdin.write(JSON.stringify(listTools) + '\n');
}, 3000);

setTimeout(() => {
  mcp.kill();
  process.exit(0);
}, 6000);
