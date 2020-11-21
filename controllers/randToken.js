const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const RES_MSSAGE = require('../modules/responseMessage');
const encrypt = require('../modules/encrypt');
const jwt = require('../modules/jwt');
const crypto = require('crypto');

module.exports = {
    getRandToken: async (req, res) => {
        
        const dd = await crypto.randomBytes(4)
        console.log(dd.toString('hex'));
    }
}