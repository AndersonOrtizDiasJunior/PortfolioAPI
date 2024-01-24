const express = require('express');
const router = express.Router();
const validator = require('../validation.js')

const aboutController = require('../controllers/about');

router.get('/', aboutController.getAbout);

router.put('/', validator.aboutValidation, aboutController.updateAbout);


module.exports = router;