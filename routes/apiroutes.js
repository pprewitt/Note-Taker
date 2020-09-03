const notesDB = require('../db/db.json');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    //API req + res
//=============================================================

//return saved notes *getNotes function
app.get("/api/notes", function(req, res) {
    return res.json(notesDB);
});

//create a new note in notesDB
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    var newNote = req.body;
    newNote.id = String(notesDB.length+1);
    
  
    console.log(newNote);
  
    notesDB.push(newNote);
  
    res.json(newNote);
});
}