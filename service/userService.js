const crypto = require('crypto');
const { User } = require('../models');

module.exports = {
  nicknameCheck: async (nickname) => {
    try {
      const alreadyNickname = await User.findOne({
        where: {
          nickname
        }
      });
      return alreadyNickname;
    } catch (err) {
      throw err;
    }
  },
  signup: async (nickname, password) => {
    try {
      const salt = crypto.randomBytes(64).toString('base64');
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      const user = await User.create({
        nickname,
        password: hashedPassword,
        salt,
      });
      return user;
    } catch (err) {
      throw err;
    }
  },
  login: async (nickname, password, salt) => {
    try {
      const inputPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      const user = await User.findOne({
        where : {
          nickname,
          password: inputPassword
        }
      });
      return user;
    } catch (err) {
      throw err;
    }
  }
}