const passport = require('passport');

const router = require('express').Router();

router.use('/', require("./swagger"));

router.use('/game', require('./games'));
router.use('/char', require('./characters'));
router.use('/att', require('./attributes'));
router.use('/user', require('./users'));


router.get('/login', passport.authenticate('github'), (req, res) => {
     // #swagger.ignore = true
    });
router.get('/logout', (req, res, next) => {
     // #swagger.ignore = true
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;