const http = require('http');

const path = require('path');

const fs = require('fs');

const server = http.createServer((req, res) => {
  // if(req.url === '/') {
  //   fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
  //     if (err) throw err;

  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.end(content);
  //   });
  // }

  // if(req.url == '/about') {
  //   fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
  //     if (err) throw err;

  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.end(content);
  //   });
  // }

  // if(req.url == '/api/users') {
  //   // normally you would make a call to the API, but we're hard-coding here just
  //   // to show some content
  //   const users = [
  //     { name: 'Frank Lee Naught-Worthy', age: 40 },
  //     { name: 'Sirius Lee Naught-Worthy', age: 60 },
  //     { name: 'Misty Showers', age: 30 }
  //   ];

  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify(users));
  // }

  // Build a file path
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url);

  // File extension
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = 'text/html';

  // Check extension and set content type
  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // Read a file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if(err.code == 'ENOENT') {
        // Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      }
      else {
        // There was a server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    }
    else {
      // it was a success response
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

// The server will run on either the port that is specified by the host, OR if it is not found,
// it will run on port 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));