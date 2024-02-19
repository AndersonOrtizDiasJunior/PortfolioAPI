const { check } = require('express-validator');

exports.userValidation = [
    check('Username', 'Username is required').not().isEmpty(),
    check('Name', 'Name is required').not().isEmpty(),
    check('Email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('Password', 'Password is required').not().isEmpty(),
    check('Birthdate', 'Birthdate must be a string in the format dd-mm-yyyy').isString().matches(/^\d{2}-\d{2}-\d{4}$/),
    check('Gender', 'Gender must be either "M", "F", or "O"').isIn(['M', 'F', 'O']),
    check('Country', 'Country must be a string').isString()
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
  