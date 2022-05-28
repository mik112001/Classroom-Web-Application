const { classroomSchema, announcementSchema, assignmentSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Classroom = require('./models/classroom');
const Announcement = require('./models/announcement');
const Assignment = require('./models/assignment');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateClassroom = (req, res, next) => {
    const { error } = classroomSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const classroom = await Classroom.findById(id);
    if (!classroom.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/classrooms/${id}`);
    }
    next();
}

module.exports.isAnnouncementAuthor = async (req, res, next) => {
    const { id, announcementId } = req.params;
    const announcement = await Announcement.findById(announcementId);
    if (!announcement.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/classrooms/${id}`);
    }
    next();
}

module.exports.validateAnnouncement = (req, res, next) => {
    const { error } = announcementSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateAssignment = (req, res, next) => {
    const { error } = assignmentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}