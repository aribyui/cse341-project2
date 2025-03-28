const express = require('express');
const passport = require('passport');
const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).send('Hello World!');
// });

// Import swagger routes
router.use('/', require('./swagger'))

// Import books routes
router.use('/books', require('./books'));

// Import movies routes
router.use('/movies', require('./movies'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err) }
    res.redirect('/');
  });
});

module.exports = router;