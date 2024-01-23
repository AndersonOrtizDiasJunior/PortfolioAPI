const router = require('express').Router();

router.use('/', require("./swagger"));

router.get('/', (req, res) => {
    //#swagger.tags=[ 'Hello World' ]
    res.send("Anderson's Portfolio API")
});

router.use('/about', require('./about'));
router.use('/education', require('./education'));
router.use('/experience', require('./experience'));
router.use('/projects', require('./projects'));
router.use('/technologies', require('./technologies'));

module.exports = router;