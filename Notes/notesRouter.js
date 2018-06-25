const express = require('express');
const Note = require('./notesModel.js');
const router = express.Router();

router
.get('/', (req, res) => {
Note
.find()
.then(notes => {
    res.status(200)
    res.json({ notes })
})
.catch(error => {
    res.status(500)
    res.json({ message: "Error in fetching Notes" })
})
})

router
.post('/', (req, res) => {
const { title, content } = req.body;
const newNote = new Note({ title, content });

if(!title || !content) {
    res.status(400)
    res.json({ message: "Title or Content information missing" })
}
else { 
newNote
.save()
.then(savedNote => {
    res.status(200)
    res.json({ savedNote })
})
.catch(error => {
    res.status(500)
    res.json({ message: "Error in creating new Note" })
})
}})

router
.delete('/:id', (req, res) => {
const { id } = req.params;

Note
.findByIdAndRemove(id)
.then(deletedNote => {
    res.status(200)
    res.json({ deletedNote })
})
.catch( err => {
    res.status(500)
    res.json({ message: "Error in deleting Note" })
})
})


module.exports = router