const express = require('express');
const router = express.Router();
const validator = require('../validation.js')
const { isAuthenticated } = require('../middleware/authenticate.js');

const educationController = require('../controllers/education');

router.post('/', isAuthenticated, validator.educationValidation, educationController.addEducation);

router.get('/', educationController.getAll);
router.get('/:id', educationController.getSingle);

router.put('/:id',isAuthenticated, validator.educationValidation, educationController.updateEducation);

router.delete('/:id',isAuthenticated,  educationController.deleteEducation);

module.exports = router;