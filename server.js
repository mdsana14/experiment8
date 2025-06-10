const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

const myEmitter = new EventEmitter();
myEmitter.on('requestReceived', (url) => {
  console.log(`Custom Event: Request received for ${url}`);
});

const server = http.createServer((req, res) => {
  myEmitter.emit('requestReceived', req.url);

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const userInfo = os.userInfo();
    const uptime = os.uptime();
    const filePath = path.join(__dirname, 'server.js');

    res.write(`<h1>Node.js Custom Server</h1>`);
    res.write(`<p>User: ${userInfo.username}</p>`);
    res.write(`<p>System Uptime: ${Math.floor(uptime / 60)} minutes</p>`);
    res.write(`<p>Current File Path: ${filePath}</p>`);

    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
