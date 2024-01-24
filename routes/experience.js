const express = require('express');
const router = express.Router();
const validator = require('../validation.js')

const experienceController = require('../controllers/experience');

router.post('/', validator.experienceValidation, experienceController.addExperience);

router.get('/', experienceController.getAll);
router.get('/:id', experienceController.getSingle);

router.put('/:id', validator.experienceValidation, experienceController.updateExperience);

router.delete('/:id', experienceController.deleteExperience);

module.exports = router;