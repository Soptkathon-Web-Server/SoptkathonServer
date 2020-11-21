var express = require('express');
var router = express.Router();
const { write } = require('../controllers/question');
const { checkToken } = require('../middleware/auth')

router.post('/multi/answer', checkToken, write);

module.exports = router;