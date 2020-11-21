const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const RES_MSSAGE = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const crypto = require('crypto');
const { MultiAnswer } = require('../models');

module.exports = {
    write: async (req, res) => {
        try {
            const user = req.decoded;
            const {page, answer} = req.body;
            var question = {};

            if (page !== "first" && page !== "second" && page !== "third" && page !== "fourth")
                res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, 'page 값을 제대로 입력해주세요.'));
            if ( !answer || answer === "" )
                res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, 'answer 값을 제대로 입력해주세요.'));
            question[page] = answer;
            
            var result = await MultiAnswer.findOne({user_id: user.id});
            console.log('question : ', question);
            console.log('result : ', result);
            if (result)
                var changeRow = await MultiAnswer.update(question, {where: {user_id: user.id}});
            else {
                question['user_id'] = user.id;
                var changeRow = await MultiAnswer.create(question);
            }
            console.log('changeRow : ', changeRow)
            if (changeRow > 0)
                res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.SUCCESS_ISSUE_TOKEN));
            else
                res.status(CODE.OK).send(util.success(CODE.BAD_REQUEST, RES_MSSAGE.NO_CHANGE_ROW));

        } catch (error) {
            console.log('get rand token error : ', error)
            res.status(CODE.SERVICE_UNAVAILABLE).send(util.fail(CODE.SERVICE_UNAVAILABLE));
        }
    }
}

