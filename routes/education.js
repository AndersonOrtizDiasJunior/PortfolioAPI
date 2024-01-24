const express = require('express');
const router = express.Router();
const validator = require('../validation.js')

const educationController = require('../controllers/education');

router.post('/', validator.educationValidation, educationController.addEducation);

router.get('/', educationController.getAll);
router.get('/:id', educationController.getSingle);

router.put('/:id',validator.educationValidation, educationController.updateEducation);

router.delete('/:id', educationController.deleteEducation);

module.exports = router;