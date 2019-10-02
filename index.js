const express = require('express');

const hubRouter = require('./hub-router')

const server = express();
server.use(express.json());


server.use('/api/posts', hubRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2> Testing API </h2>`)
})

const port = 6000;

server.listen(port, () => console.log(`webapi-ii-challenge on ${port}`))