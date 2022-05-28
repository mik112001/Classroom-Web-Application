const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionFileSchema = new Schema({
    url: String,
    filename: String
});

const submissionSchema = new Schema({
    files: [SubmissionFileSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Submission", submissionSchema);