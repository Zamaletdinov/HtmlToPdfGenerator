const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');
const pingRouter = require('./routes/pingRouter');

const server = express();

server.use(bodyParser.json({
    limit: '10mb'
}));

server.use('/api', apiRouter);
server.use('/ping', pingRouter);

module.exports = server;