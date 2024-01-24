const { check } = require('express-validator');

exports.aboutValidation = [
    check('headline', 'Headline is requied').not().isEmpty(),
    check('jobTitle', 'Job Title is requied').not().isEmpty(),
    check('city', 'City is requied').not().isEmpty(),
    check('phone', 'Phone is requied').not().isEmpty(),
    check('description', 'Description is requied').not().isEmpty(),
    check('image', 'Image is requied').not().isEmpty(),
    check('whatsapp.label', 'Whatsapp label is requied').not().isEmpty(),
    check('whatsapp.number', 'Whatsapp number is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
];

exports.educationValidation = [
    check('visible', 'Visible should be boolean').isBoolean(),
    check('name', 'Name is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
    check('instituition', 'Instituition is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
];

exports.experienceValidation = [
    check('visible', 'Visible should be boolean').isBoolean(),
    check('name', 'Name is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
    check('instituition', 'Instituition is required').not().isEmpty(),
    check('bullets', 'Bullets are required').isArray({ min: 1 })
];

exports.projectValidation = [
    check('id', 'ID is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('filter', 'Filter is required').not().isEmpty(),
    check('thumb', 'Thumb is required').not().isEmpty(),
    check('portfolio', 'Portfolio should be boolean').isBoolean(),
    check('images', 'Images are required').isArray({ min: 1 }),
    check('description', 'Description is required').not().isEmpty(),
    check('skills', 'Skills are required').isArray({ min: 1 }),
    check('type', 'Type is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('date.title', 'Date title is required').not().isEmpty(),
    check('date.value', 'Date value is required').not().isEmpty()
];

exports.technologiesValidation = [
    check('id', 'ID is required').not().isEmpty(),
    check('logos', 'Logos are required').isArray({ min: 1 })
];
  