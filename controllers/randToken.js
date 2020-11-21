const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const RES_MSSAGE = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const crypto = require('crypto');
const { User } = require('../models');

module.exports = {
    get: async (req, res) => {
        try {
            const randToken = await crypto.randomBytes(4).toString('hex');
            const user = await User.create({nickname: randToken});
            const {token} = await jwt.sign(user);
            res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.SUCCESS_ISSUE_TOKEN, {token}));
        } catch (error) {
            console.log('get rand token error : ', error)
            res.status(CODE.SERVICE_UNAVAILABLE).send(util.fail(CODE.SERVICE_UNAVAILABLE));
        }
    },
    delByToken: async function (req, res) {
        try {
            const id = req.query.id;
            if (!id) {
                const user = req.decoded;
                id = user.id;
            }
            const result = await User.destroy({where: {id}});
            if (result > 0)
                res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.DELETE_ISSUE_TOKEN));
            else 
                res.status(CODE.OK).send(util.success(CODE.BAD_REQUEST, RES_MSSAGE.EMPTY_RAND_TOKEN));
            
        } catch (error) {
            console.log('get rand token error : ', error)
            res.status(CODE.SERVICE_UNAVAILABLE).send(util.fail(CODE.SERVICE_UNAVAILABLE));
        }
    },
    checkRandToken: (req, res) => {
        const user = req.decoded;
        res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.SUCCESS_ISSUE_TOKEN, {id: user.id, nickname: user.nickname}));
    }
}

