const db = require('./data/db');
const express = require('express');

const server = express();
server.use(express.json());


server.get('/', (req,res) => {
    res.status(200).json({api: "api running"})
})

//api/posts
server.get('/api/posts', (req, res) => {
    db.find()
    .then((db) => {
        res.status(200).json(db)
    })
    .catch((err) => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

























module.exports = server;