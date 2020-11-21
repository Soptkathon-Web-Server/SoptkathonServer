const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const {
    User
} = require('../models');
const {
    userService
} = require('../service');
const jwt = require('../modules/jwt');
const randToken = require('../controllers/randToken');

module.exports = {
    signup: async (req, res) => {
        const {
            nickname,
            id,
            password,
        } = req.body;
        var randToken;
        if (!nickname || !password) {
            console.log('필요한 값이 없습니다!');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        try {
            const token = req.header.jwt;
            const data = jwt.verify(token);
            if (data) {
                randToken = data.nickname;
            }
            console.log('data: ', data );
            console.log('randToken: ', randToken);
            const alreadyNickname = await userService.nicknameCheck(nickname);
            if (alreadyNickname) {
                console.log('이미 존재하는 닉네임 입니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_NICKNAME));
            }

            if(randToken) {
            await userService.updateUser(nickname, password, randToken);
        }
            else {
                const user = await userService.signup(nickname, password, randToken);
            }
    
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SUCCESS_SIGNUP, {
                nickname: nickname,
                id: id
            }))
        } catch (error) {
            console.error(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
        }
    },
    
    login: async (req, res) => {
        const {
            nickname,
            password
        } = req.body;
        if (!nickname || !password) {
            console.log('필요한 값이 없습니다!');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }

        try {
            const alreadyNickname = await userService.nicknameCheck(nickname);
            if (!alreadyNickname) {
                console.log('없는 닉네임 입니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_NICKNAME));
            }

            const {
                salt,
                password: hashedPassword
            } = alreadyNickname;
            const user = await userService.login(nickname, password, salt);

            if (!user) {
                console.log('비밀번호가 일치하지 않습니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
            }
            const {
                accessToken,
                refreshToken
            } = await jwt.sign(user);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {
                accessToken,
                refreshToken
            }));
        } catch (error) {
            console.error(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_IN_FAIL));
        }
    }
}