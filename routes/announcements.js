const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateAnnouncement, isLoggedIn, isAnnouncementAuthor } = require('../middleware');
const Classroom = require('../models/classroom');
const Announcement = require('../models/announcement');
const announcements = require('../controllers/announcements');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.post('/', isLoggedIn, upload.array('image'), validateAnnouncement, catchAsync(announcements.createAnnouncement))

router.delete('/:announcementId', isLoggedIn, isAnnouncementAuthor, catchAsync(announcements.deleteAnnouncement))

module.exports = router;