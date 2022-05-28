const Classroom = require('../models/classroom');
const Announcement = require('../models/announcement');
const { cloudinary } = require("../cloudinary");

module.exports.createAnnouncement = async (req, res) => {
    const classroom = await Classroom.findById(req.params.id);
    const announcement = new Announcement(req.body.announcement);
    announcement.files = req.files.map(f => ({ url: f.path, filename: f.filename }));
    announcement.author = req.user._id;
    classroom.announcements.push(announcement);
    await announcement.save();
    await classroom.save();
    req.flash('success', 'Created new announcement!');
    res.redirect(`/classrooms/${classroom._id}`);
}

module.exports.deleteAnnouncement = async (req, res) => {
    const { id, announcementId } = req.params;
    await Classroom.findByIdAndUpdate(id, { $pull: { announcements: announcementId } });
    await Announcement.findByIdAndDelete(announcementId);
    req.flash('success', 'Successfully deleted announcement')
    res.redirect(`/classrooms/${id}`);
}
