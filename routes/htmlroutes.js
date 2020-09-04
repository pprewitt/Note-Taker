const path = require('path');

module.exports = (app) => {
// returning html files
// =============================================================
// responds with the notes page=======================
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  
//responds with the home page========================
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
}