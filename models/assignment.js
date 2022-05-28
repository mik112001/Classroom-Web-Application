const mongoose = require('mongoose');
const Submission = require('./submission')
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    url: String,
    filename: String
});

const assignmentSchema = new Schema({
    body: String,
    files: [FileSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    submissions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Submission'
        }
    ]
});

module.exports = mongoose.model("Assignment", assignmentSchema);