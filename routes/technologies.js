const express = require('express');
const router = express.Router();

const technologiesController = require('../controllers/technologies');

router.post('/', technologiesController.addTechnologies);

router.get('/', technologiesController.getAll);
router.get('/:id', technologiesController.getSingle);

router.put('/:id', technologiesController.updateTechnologies);

router.delete('/:id', technologiesController.deleteTechnologies);

module.exports = router;