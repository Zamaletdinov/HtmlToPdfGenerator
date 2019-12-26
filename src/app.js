const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');
const pingRouter = require('./routes/pingRouter');

const app = express();

app.use(bodyParser.json({
    limit: '10mb'
}));

app.use('/api', apiRouter);
app.use('/ping', pingRouter);

module.exports = app;