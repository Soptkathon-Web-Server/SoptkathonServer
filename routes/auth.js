var express = require('express');
var router = express.Router();
const { get, delByToken, checkRandToken } = require('../controllers/randToken');
const { checkToken } = require('../middleware/auth')
const { login, signup } = require('../controllers/user');
const { signup, login } = require('../controllers/user');

router.get('/rand-token', get);
router.delete('/rand-token', checkToken, delByToken);
router.post('/signup', signup);
router.post('/login', login);


router.get('/check-token', checkToken, checkRandToken);

module.exports = router;