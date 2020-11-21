var express = require('express');
var router = express.Router();
const { getRandToken, checkRandToken } = require('../controllers/randToken');
const { checkToken } = require('../middleware/auth')
const { login, signup } = require('../controllers/user');


var util = require('../modules/util');
var responseMessage = require('../modules/responseMessage');
var statusCode = require('../modules/statusCode');
const { User } = require('../models');
const userController = require('../controllers/user');


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/rand-token', getRandToken);
router.get('/check-token', checkToken, checkRandToken);

module.exports = router;