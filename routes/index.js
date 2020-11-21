var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api/auth', require('./auth'));
router.use('/api/question', require('./question'));
router.use('/api/users', require('./users'));
router.use('/api/stones', require('./stone'));

module.exports = router;
