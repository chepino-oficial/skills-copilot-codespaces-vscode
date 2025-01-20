// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const comments = require('./comments.json');

const server = http.createServer((req, res) => {
  if (req.url === '/comments' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comments));
  } else if (req.url === '/comments' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const newComment = JSON.parse(body);
      comments.push(newComment);
      fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newComment));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});