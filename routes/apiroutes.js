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
    
        notesDB.push(newNote);

        writeFile(notesDB);

        res.json(newNote);

        console.log(notesDB)
    });

    app.delete("/api/notes/:id", function (req, res) {

        for (let i = 0; i < notesDB.length; i++) {
            if (notesDB[i].id === req.params.id) {
                notesDB.splice(i, 1);
            }
        }
        writeFile(notesDB);
        res.json(notesDB)
    })

    function writeFile(notesDB) {
        fs.writeFile('db/db.json', JSON.stringify(notesDB), function (err) {
            if (err) throw err;
            console.log("success");
        });
    }
}