//make routes for GET POST and DELETE notes
const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

module.exports = function(app) {

    //GET /api/notes - Should read the db.json file and return all saved notes as JSON.
    app.get("/api/notes", function(req, res) {
        console.log('get')
        fs.readFile('./db/db.json', (err, data) => {
            if (err) throw err;
            console.log('reading files');
            res.json(JSON.parse(data));
        });
    });
      
    //POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
    app.post('/api/notes', function (req, res) {
        console.log("post");
        const newNote = req.body;
        req.body.id = (uuidv4());//classmate helped with this line of combining id
        db.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        res.json(db);
    })
    
    //DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. 
    //This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, 
    //you'll need to read all notes from the db.json file, remove the note with the given id property, 
    //and then rewrite the notes to the db.json file.
    app.delete('/api/notes/:id', function(req, res) {

        //works cited: https://stackoverflow.com/questions/53661683/matching-a-delete-request-to-a-json-object
        fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        
        let deletedNotes = req.params.id;
        for (let i = 0; i < db.length; i++) {   
            if (db[i].id === deletedNotes) {
                db.splice(i, 1);
                res.json(db);
                
                fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
                    if (err) throw err;
                
                });
                
            }  
            
        }
    });
    
});


}
