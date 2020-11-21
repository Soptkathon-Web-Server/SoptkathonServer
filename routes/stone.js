var express = require('express');
var router = express.Router();
const { get } = require('../controllers/stone');
const { checkToken } = require('../middleware/auth')

router.get('/', get);

module.exports = router;