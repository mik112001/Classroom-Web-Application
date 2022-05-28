const express = require('express');
const router = express.Router();
const classrooms = require('../controllers/classrooms');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateClassroom } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Classroom = require('../models/classroom');

router.route('/')
    .get(isLoggedIn, catchAsync(classrooms.index))
    .post(isLoggedIn, upload.array('image'), validateClassroom, catchAsync(classrooms.createClassroom))


router.get('/new', isLoggedIn, classrooms.renderNewForm)

router.route('/:id')
    .get(catchAsync(classrooms.showClassroom))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateClassroom, catchAsync(classrooms.updateClassroom))
    .delete(isLoggedIn, isAuthor, catchAsync(classrooms.deleteClassroom));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(classrooms.renderEditForm))



module.exports = router;