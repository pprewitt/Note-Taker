const notesDB = require('../db/db.json');
const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');

module.exports = (app) => {
    //API req + res
    //=============================================================

    //return saved notes *getNotes function
    app.get("/api/notes", function (req, res) {
        return res.json(notesDB);
    });

    //create a new note in notesDB
    app.post("/api/notes", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        var newNote = req.body;
        //assigns a unique id used to be used when deleting
        newNote.id = uniqid()
        //pushes new new note to object in the db
        notesDB.push(newNote);
        //writes the db to the db.json file
        writeFile(notesDB);
        //responds with the new note
        res.json(newNote);

    });
    //deletes a note on the screen and in the array
    app.delete("/api/notes/:id", function (req, res) {
        //look for the unique id assigned in the post function abover
        for (let i = 0; i < notesDB.length; i++) {
            //when the unique id in the array matches the one sent in the request
            if (notesDB[i].id === req.params.id) {
                //delete that array object
                notesDB.splice(i, 1);
            }
        }
        //write the array to the db.json file
        writeFile(notesDB);
        //responds with the list of notes minus the one just deleted
        res.json(notesDB)
    })
    //writefile function used above. formats and writes the notes entry to the db.son file
    function writeFile(notesDB) {
        fs.writeFile('db/db.json', JSON.stringify(notesDB), function (err) {
            if (err) throw err;
            console.log("success");
        });
    }
}