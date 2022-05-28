const Classroom = require('../models/classroom');
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const classrooms = await Classroom.find({});
    res.render('classrooms/index', { classrooms })
}

module.exports.renderNewForm = (req, res) => {
    res.render('classrooms/new');
}

module.exports.createClassroom = async (req, res, next) => {
    const classroom = new Classroom(req.body.classroom);
    classroom.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    classroom.author = req.user._id;
    await classroom.save();
    console.log(classroom);
    req.flash('success', 'Successfully made a new classroom!');
    res.redirect(`/classrooms/${classroom._id}`)
}

module.exports.showClassroom = async (req, res,) => {
    const classroom = await Classroom.findById(req.params.id).populate({
        path: 'announcements',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!classroom) {
        req.flash('error', 'Cannot find that classroom!');
        return res.redirect('/classrooms');
    }
    res.render('classrooms/show', { classroom });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const classroom = await Classroom.findById(id)
    if (!classroom) {
        req.flash('error', 'Cannot find that classroom!');
        return res.redirect('/classrooms');
    }
    res.render('classrooms/edit', { classroom });
}

module.exports.updateClassroom = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const classroom = await Classroom.findByIdAndUpdate(id, { ...req.body.classroom });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    classroom.images.push(...imgs);
    await classroom.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await classroom.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated classroom!');
    res.redirect(`/classrooms/${classroom._id}`)
}

module.exports.deleteClassroom = async (req, res) => {
    const { id } = req.params;
    await Classroom.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted classroom')
    res.redirect('/classrooms');
}