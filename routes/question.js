var express = require('express');
var router = express.Router();
const { writeMulti, writeShort, getShortQuestion} = require('../controllers/question');
const { checkToken } = require('../middleware/auth')

router.post('/multi/answer', checkToken, writeMulti);
router.get('/short', checkToken, getShortQuestion);
router.post('/short/answer', checkToken, writeShort);

module.exports = router;