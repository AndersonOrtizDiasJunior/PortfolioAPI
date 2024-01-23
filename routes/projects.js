const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projects');

router.post('/', projectsController.addProjects);

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getSingle);

router.put('/:id', projectsController.updateProjects);

router.delete('/:id', projectsController.deleteProjects);

module.exports = router;