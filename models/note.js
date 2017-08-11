// Require mongoose (dependencies)
var mongoose = require('mongoose');
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var NoteSchema = new Schema({
    _article: {
        type: String,
        ref: 'Article'
    },
    text: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;