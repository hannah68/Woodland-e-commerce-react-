const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const express = require('express');
const router = jsonServer.router('./db/db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3030;

server.use(middlewares);
server.use(router);
server.use(express.static(path.join(__dirname, 'build')));

server.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
server.listen(port);