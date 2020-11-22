const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const RES_MSSAGE = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const crypto = require('crypto');
const {
    User,
    MultiAnswer,
    ShortAnswer,
    ShortQuestion
} = require('../models');
const shortAnswer = require('../models/shortAnswer');

module.exports = {
    get: async (req, res) => {
        try {
            if (req.query.id) {
                return getParam(req, res);
            }
            const user_id = req.decoded.id;
            try {
                const result = await User.findOne({
                    where: {
                        id: user_id
                    },
                    include: [{
                        model: ShortQuestion,
                        require: true,
                    }],
                });
                res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.SUCCESS_READ_STONE, result));
            } catch (error) {
                console.log(error);
            }
            res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.SUCCESS_SAVE_ANSWER, '이건 get'));
        } catch (error) {
            console.log('get rand token error : ', error)
            res.status(CODE.SERVICE_UNAVAILABLE).send(util.fail(CODE.SERVICE_UNAVAILABLE));
        }
    }
}

async function getParam(req, res) {
    const user_id = req.decoded.id;
    const id = req.query.id;
    try {
        const result = await User.findOne({
            where: {
                id: user_id
            },
            include: [{
                model: ShortQuestion,
                require: true,
            }],
        });
        res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.SUCCESS_READ_STONE, result));
    } catch (error) {
        console.log(error);
    }
}