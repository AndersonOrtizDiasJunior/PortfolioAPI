const express = require('express');
const router = express.Router();

const experienceController = require('../controllers/experience');

router.post('/', experienceController.addExperience);

router.get('/', experienceController.getAll);
router.get('/:id', experienceController.getSingle);

router.put('/:id', experienceController.updateExperience);

router.delete('/:id', experienceController.deleteExperience);

module.exports = router;