const db = require('./data/db');
const express = require('express');

const server = express();
server.use(express.json());


server.get('/', (req,res) => {
    res.status(200).json({api: "api running"})
})

// get api/posts/
server.get('/api/posts', (req, res) => {
    db.find()
    .then((db) => {
        res.status(200).json(db)
    })
    .catch((error) => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

//post api/posts/
server.post('/api/posts', (req, res) => {
    const addPost = req.body;
    const {tilte, contents} = req.body;
    if (tilte, contents) {
        db.insert(addPost)
        .then(db => {
            res.status(201).json(db)
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving the post to the database."})
        })
    } else {
        res.status(400).json({errorMessage: "Please provide text for the comment." })
    }
})






















module.exports = server;