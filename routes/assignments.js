const express = require('express');
const router = express.Router({ mergeParams : true });
const assignments = require('../controllers/assignments');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateClassroom, validateAssignment } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(assignments.index))
    .post(isLoggedIn, upload.array('image'), catchAsync(assignments.createAssignment))

router.route('/:__id')
    .get(catchAsync(assignments.showAssignment))    
    .post(isLoggedIn, upload.array('image'), catchAsync(assignments.createSubmission))

module.exports = router;