const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note'); 
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes : GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 2: Add a new Note using : POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid Name').isLength({min:3}),
    body('description', 'description must have a minimum of 5 characters').isLength({min:5}),
], async (req, res)=>{
    try {
        const {title, description, tag} = req.body;

        // if there are errors return BAD requests and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user:req.user.id
        })
        const savedNote = await note.save();;
        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }    
});

module.exports = router;