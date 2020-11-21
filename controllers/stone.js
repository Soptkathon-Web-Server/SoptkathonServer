const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const RES_MSSAGE = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const crypto = require('crypto');
const {User} = require('../models');

module.exports = {
    get: async (req, res) => {
        try {
            if (req.query.id) {
                return getParam(req, res);
            }
            res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.SUCCESS_SAVE_ANSWER, '이건 get'));
        } catch (error) {
            console.log('get rand token error : ', error)
            res.status(CODE.SERVICE_UNAVAILABLE).send(util.fail(CODE.SERVICE_UNAVAILABLE));
        }
    }
}

function getParam (req, res) {
    res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.SUCCESS_SAVE_ANSWER, '이건 getParam'));
}