const passport = require('passport');

const router = require('express').Router();

router.use('/', require("./swagger"));

// router.get('/', (req, res) => {
//     //#swagger.tags=[ 'Hello World' ]
//     res.send("Anderson's Portfolio API")
// });

router.use('/about', require('./about'));
router.use('/education', require('./education'));
router.use('/experience', require('./experience'));
router.use('/projects', require('./projects'));
router.use('/technologies', require('./technologies'));

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', (req, res, next) => {
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;