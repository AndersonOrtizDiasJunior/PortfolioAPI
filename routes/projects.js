const express = require('express');
const router = express.Router();
const validator = require('../validation.js')

const projectsController = require('../controllers/projects');

router.post('/', validator.projectValidation, projectsController.addProjects);

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getSingle);

router.put('/:id', validator.projectValidation, projectsController.updateProjects);

router.delete('/:id', projectsController.deleteProjects);

module.exports = router;