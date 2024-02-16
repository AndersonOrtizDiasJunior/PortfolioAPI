const express = require('express');
const router = express.Router();
const validator = require('../validation.js')
const { isAuthenticated } = require('../middleware/authenticate.js');

const attController = require('../controllers/attributes.js');

router.post('/',isAuthenticated, validator.attValidation, attController.addAttribute);

router.get('/fromGame/:gameId', attController.getByGame);
router.get('/:attId', attController.getByID);

router.put('/:id',isAuthenticated, validator.attValidation, attController.updateAttribute);

router.delete('/:id',isAuthenticated, attController.deleteAttribute);

module.exports = router;