const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(`${__dirname}/public`));

module.exports = { app, http, io };