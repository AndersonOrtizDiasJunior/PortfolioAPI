const express = require('express');
const router = express.Router();
const validator = require('../validation.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

const technologiesController = require('../controllers/technologies');

router.post('/', validator.technologiesValidation, technologiesController.addTechnologies);

router.get('/', technologiesController.getAll);
router.get('/:project', technologiesController.getSingle);

router.put('/:id', validator.technologiesValidation, technologiesController.updateTechnologies);

router.delete('/:id', technologiesController.deleteTechnologies);

module.exports = router;