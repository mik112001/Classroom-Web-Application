const mongoose = require('mongoose');
const Announcement = require('./announcement')
const Assignment = require('./assignment')
const Submission = require('./submission')
const Schema = mongoose.Schema;



const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const ClassroomSchema = new Schema({
    title: String,
    images: [ImageSchema],
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    announcements: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Announcement'
        }
    ],
    assignments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Assignment'
        }
    ]
});



ClassroomSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Announcement.deleteMany({
            _id: {
                $in: doc.announcements
            }
        });
        await Assignment.deleteMany({
            _id: {
                $in: doc.assignments
            }
        });
        await Submission.deleteMany({
            _id: {
                $in: doc.submissions
            }
        })
    }
})

module.exports = mongoose.model('Classroom', ClassroomSchema);