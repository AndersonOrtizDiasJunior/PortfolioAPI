const { check } = require('express-validator');

exports.userValidation = [
    check('Username', 'Phone is requied').not().isEmpty(),
    check('Name', 'Phone is requied').not().isEmpty(),
    check('Email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('Password', 'Password is requied').not().isEmpty()
];

exports.charValidation = [
    check('Game', 'Game is required').not().isEmpty(),
    check('User', 'User is required').not().isEmpty(),
    check('Params', 'Params needs to be an Array').isArray({ min: 1})
];

exports.gameValidation = [
    check('Name', 'Name is required').not().isEmpty(),
    check('Master', 'Master is required').not().isEmpty(),
    check('Description', 'Description is required').not().isEmpty(),
    check('Players', 'Players needs to be an Array').isArray()
];

exports.attValidation = [
    check('Name', 'Name is required').not().isEmpty(),
    check('Type', 'Type is required').not().isEmpty()
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
    check('project', 'Project is required').not().isEmpty(),
    check('logos', 'Logos are required').isArray({ min: 1 })
];
  