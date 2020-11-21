var express = require('express');
var router = express.Router();
const { getRandToken, checkRandToken } = require('../controllers/randToken');
const { checkToken } = require('../middleware/auth')
// const { login, signup } = require('../controllers/user');

router.get('/rand-token', getRandToken);
router.get('/check-token', checkToken, checkRandToken);
// router.post('/login', login);
// router.get('/signup', signup);

module.exports = router;