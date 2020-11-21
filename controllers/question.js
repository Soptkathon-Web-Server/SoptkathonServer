const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const RES_MSSAGE = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const crypto = require('crypto');
const { MultiAnswer } = require('../models');
const { ShortAnswer } = require('../models');
const { ShortQuestion } = require('../models');
const {Op} = require('sequelize')


module.exports = {
    writeMulti: async (req, res) => {
        try {
            const user = req.decoded;
            const {page, answer} = req.body;
            var question = {};

            if (page !== "first" && page !== "second" && page !== "third" && page !== "fourth")
                res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, 'page 값을 제대로 입력해주세요.'));
            if ( !answer || answer === "" )
                res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, 'answer 값을 제대로 입력해주세요.'));
            question[page] = answer;
            
            var result = await MultiAnswer.findOne({where: {user_id: user.id}});
            var changeRow = 0

            if (result)
                changeRow = await MultiAnswer.update(question, {where: {user_id: user.id}});
            else {
                question['user_id'] = user.id;
                changeRow = await MultiAnswer.create(question);
            }
            if (changeRow > 0)
                res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.SUCCESS_SAVE_ANSWER));
            else
                res.status(CODE.OK).send(util.success(CODE.BAD_REQUEST, RES_MSSAGE.NO_CHANGE_ROW));
        } catch (error) {
            res.status(CODE.SERVICE_UNAVAILABLE).send(util.fail(CODE.SERVICE_UNAVAILABLE));
        }
    },
    writeShort: async (req, res) => {
        try {
            const user = req.decoded;
            const {question_id, answer} = req.body;

            if ( !answer || !question_id || answer === "" )
                res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, '값을 제대로 입력해주세요.'));

            await ShortAnswer.create({user_id: user.id, question_id, answer});
            res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.SUCCESS_SAVE_ANSWER));
        } catch (error) {
            console.log('writeShort error : ', error)
            res.status(CODE.SERVICE_UNAVAILABLE).send(util.fail(CODE.SERVICE_UNAVAILABLE));
        }
    },
    getShortQuestion: async (req, res) => {
        try {
            const max = 25;
            const min = 1;
            const randNum = [];
            var num;
        while (randNum.length !== 5) {
            num = Math.floor(Math.random()*(max-min+1)) + min;
            if (!randNum.includes(num))
                randNum.push(num);
        }

        const result = await ShortQuestion.findAll({where: {id: {[Op.in]: randNum}}})
        res.status(CODE.OK).send(util.success(CODE.OK, RES_MSSAGE.SUCCESS_ISSUE_TOKEN, {result}));
    } catch (error) {
        console.log('getShortQuestion error : ', error)
            res.status(CODE.SERVICE_UNAVAILABLE).send(util.fail(CODE.SERVICE_UNAVAILABLE));
    }
    }
}

