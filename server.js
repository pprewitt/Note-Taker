var express = require("express");
var path = require("path");
const notesDB = require('../db/db.json');
const fs = require('fs');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// returning html files
// =============================================================
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });



//API req + res
//=============================================================

//return saved notes *getNotes function
app.get("/api/notes", function(req, res) {
    return res.json(notesDB);
});
  
// saves a note *saveNote function
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
  
    console.log(newNote);
  
    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        return res.json(characters[i]);
      }
    }
  
    return res.json(false);
});
  
// saves a note *saveNote function
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
  
    // Using a RegEx Pattern to remove spaces from newNote
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    notesDB.push(newNote);
  
    res.json(newNote);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  