const express = require('express');
const router = express.Router();
const validator = require('../validation.js')
const { isAuthenticated } = require('../middleware/authenticate.js');

const experienceController = require('../controllers/experience');

router.post('/',isAuthenticated, validator.experienceValidation, experienceController.addExperience);

router.get('/', experienceController.getAll);
router.get('/:id', experienceController.getSingle);

router.put('/:id',isAuthenticated, validator.experienceValidation, experienceController.updateExperience);

router.delete('/:id',isAuthenticated, experienceController.deleteExperience);

module.exports = router;