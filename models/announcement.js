const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    url: String,
    filename: String
});

const announcementSchema = new Schema({
    body: String,
    files: [FileSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Announcement", announcementSchema);

