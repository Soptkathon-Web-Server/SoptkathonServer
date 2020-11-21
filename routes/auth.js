var express = require('express');
var router = express.Router();
const { getRandToken } = require('../controllers/randToken');
// const { login, signup } = require('../controllers/user');

router.get('/rand-token', getRandToken);
// router.post('/login', login);
// router.get('/signup', signup);

module.exports = router;