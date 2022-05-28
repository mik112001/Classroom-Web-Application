const Joi = require('joi');
const { number } = require('joi');

module.exports.classroomSchema = Joi.object({
    classroom: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.announcementSchema = Joi.object({
    announcement: Joi.object({
        body: Joi.string().required()
    }).required()
})

module.exports.assignmentSchema = Joi.object({
    announcement: Joi.object({
        body: Joi.string().required()
    }).required()
})

