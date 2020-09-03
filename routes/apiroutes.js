//make routes for GET POST and DELETE notes
const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

module.exports = function(app) {
    //GET  api
    //reads the db.json file and returns saved notes in json
    app.get("/api/notes", function(req, res) {
        console.log("get");
        res.json(db);
    });
    
    //POST api
    app.post('/api/notes', function (req, res) {
        console.log('post')
        res.json(db);
        const newNote = {
            id: uuidv4(),
            noteTitle: req.body.noteTitle,
            noteText: req.body.noteText
        }
        //add to newnote
        db.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
    })

    //DELETE api

    
}

//The application should have a db.json file on the backend that will be used to store and retrieve notes using the fs module.

//The following API routes should be created:
//GET /api/notes - Should read the db.json file and return all saved notes as JSON.

//POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

//DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. 

//This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, 

//you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.