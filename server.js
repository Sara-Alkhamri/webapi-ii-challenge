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

//get api/posts/:id/
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then((byId) => {
        if(byId.length > 0) {
            res.status(200).json(byId)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch((error) => {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
})

//delete /api/posts/id
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then((byId) => {
        if(byId.length == 0) {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
        return byId;
    })
    .then((byId) => {
        db.remove(id)
        .then(() => {
            res.status(200).json(byId)
        })
        .catch((error) => {
            res.status(500).json({error: "The post could not be removed"})
        })
    })
})



















module.exports = server;