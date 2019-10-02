const db = require('./data/db');
const express = require('express');

const router = express.Router();
// server.use(express.json());

// get api/posts/
router.get('/', (req, res) => {
    db.find()
    .then(posts => res.status(200).json(posts))
    .catch((error) => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

//post api/posts/
router.post('/', (req, res) => {
    const addPost = req.body;
    const {tilte, contents} = req.body;
    if (tilte, contents) {
        //insert(): calling insert passing it a post object will add it to the database and return an object with
        //the id of the inserted post. The object looks like this: { id: 123 }
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
router.get('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

//get api/posts/:post_id/comments
router.get('/:post_id/comments', (req, res) => {
    const {post_id} = req.params;
    db.findById(post_id)
        .then(post => {
            if (post.length) {
                db.findPostComments(post_id)
                    .then(comments => res.status(200).json(comments))
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch (error => {
        console.log(error);
        res.status(500).json({ error: "The comments information could not be retrieved." });
    });
    
})

//post api/posts/:post_id/comments
router.post('/:post_id/comments', (req, res) => {
    const {post_id} =req.params;
    const text = req.body.text;
    // insertComment(): calling insertComment while passing it a comment object will add it to the database and return an object with the id of the inserted comment. The object looks like this: { id: 123 }. This method will throw an error if the post_id field 
    // in the comment object does not match a valid post id in the database.
    db.insertComment({text, post_id})
    .then(comment => {
        res.status(200).json(comment);
    })
    .catch(error => {
        res.status(500).json({error: "There was an error while saving the comment to the database" })
    })
})

//put
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const contents = req.body.contents;
    if (!title && !contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    db.update(id, { title, contents })
        .then(updated => {
            console.log(updated);
            if (updated) {
                db.findById(id)
                    .then(post => {
                        console.log(post);
                        if (post.length) {
                            res.status(200).json(post);
                        } else {
                            res.status(404).json({ message: "The post with the specified ID does not exist." });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({ error: "There was an error while getting the post from the database." });
                    });
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while updating the post to the database." });
        });
});



















module.exports = router;