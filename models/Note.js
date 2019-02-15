const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    body: String,
    author: {
        type: String,
        required: true
    }
});

var Note = mongoose.model("Note", NoteSchema);
module.exports = Note;