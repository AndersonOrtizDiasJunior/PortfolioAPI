const express = require('express');
const router = express.Router();
const validator = require('../validation.js')

const technologiesController = require('../controllers/technologies');

router.post('/', validator.technologiesValidation, technologiesController.addTechnologies);

router.get('/', technologiesController.getAll);
router.get('/:id', technologiesController.getSingle);

router.put('/:id', validator.technologiesValidation, technologiesController.updateTechnologies);

router.delete('/:project', technologiesController.deleteTechnologies);

module.exports = router;