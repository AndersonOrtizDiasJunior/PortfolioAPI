const express = require('express');
const router = express.Router();
const validator = require('../validation.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

const usersController = require('../controllers/users.js');

router.post('/',isAuthenticated, validator.userValidation, usersController.addUser);

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.put('/:id',isAuthenticated, validator.userValidation, usersController.updateUser);

router.delete('/:id',isAuthenticated, usersController.deleteUser);

module.exports = router;