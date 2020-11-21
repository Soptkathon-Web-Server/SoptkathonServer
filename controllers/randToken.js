const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const RES_MSSAGE = require('../modules/responseMessage');
const encrypt = require('../modules/encrypt');
const jwt = require('../modules/jwt');
const crypto = require('crypto');
const { User } = require('../models');

module.exports = {
    getRandToken: async (req, res) => {
        const token = await crypto.randomBytes(4)
        await User.create({
            nickname: token
        });
        
        res.status(CODE.OK).send(util.success(CODE.OK, RES_MESSAGE.SUCCESS_ISSUE_TOKEN));
    }
}

