const express = require('express');
const router = express.Router();
const validator = require('../validation.js')
const { isAuthenticated } = require('../middleware/authenticate.js');

const charController = require('../controllers/characters.js');

router.post('/', isAuthenticated, validator.charValidation, charController.addChar);

router.get('/fromGame/:gameId', charController.getByGame);
router.get('/:charId', charController.getById);

router.put('/:id',isAuthenticated, validator.charValidation, charController.updateChar);

router.delete('/:id',isAuthenticated,  charController.deleteChar);

module.exports = router;