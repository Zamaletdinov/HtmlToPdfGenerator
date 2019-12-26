const app = require('./server');
const http = require('http');

const port = process.env.PORT || 3000;

http.createServer(app).listen(port);
console.log(`Server listening on port ${port}`);