var express = require('express');
var router = express.Router();
const { write, getShortQuestion} = require('../controllers/question');
const { checkToken } = require('../middleware/auth')

router.post('/multi/answer', checkToken, write);
router.get('/short', checkToken, getShortQuestion);

module.exports = router;