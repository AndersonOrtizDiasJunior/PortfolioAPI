const express = require('express');
const router = express.Router();
const validator = require('../validation.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

const gameController = require('../controllers/games.js');

router.post('/', validator.gameValidation, gameController.addGame);

router.get('/:gameId', gameController.getByID);

router.get('/fromUser/:userId', gameController.getByUser);

router.get('/fromMaster/:userId', gameController.getByMaster);

router.put('/:gameId', isAuthenticated, validator.gameValidation, gameController.updateGame);

router.delete('/:gameId', isAuthenticated, gameController.deleteGame);

module.exports = router;