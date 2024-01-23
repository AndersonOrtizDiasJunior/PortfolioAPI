const express = require('express');
const router = express.Router();

const educationController = require('../controllers/education');

router.post('/', educationController.addEducation);

router.get('/', educationController.getAll);
router.get('/:id', educationController.getSingle);

router.put('/:id', educationController.updateEducation);

router.delete('/:id', educationController.deleteEducation);

module.exports = router;