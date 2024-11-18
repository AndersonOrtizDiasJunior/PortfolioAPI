const express = require('express');
const router = express.Router();
const validator = require('../validation.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

const projectsController = require('../controllers/projects');

router.post('/',isAuthenticated, validator.projectValidation, projectsController.addProjects);

router.get('/', projectsController.getAll);
router.get('/filter/:filter', projectsController.getFiltered);
router.get('/:id', projectsController.getSingle);

router.put('/:id',isAuthenticated, validator.projectValidation, projectsController.updateProjects);

router.delete('/:id',isAuthenticated, projectsController.deleteProjects);

module.exports = router;