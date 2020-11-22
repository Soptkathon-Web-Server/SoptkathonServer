const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.MultiAnswer = require('./multiAnswer')(sequelize, Sequelize);
db.ShortAnswer = require('./shortAnswer')(sequelize, Sequelize);
db.ShortQuestion = require('./shortQuestion')(sequelize, Sequelize);

db.User.belongsToMany(db.ShortQuestion, {
  through: 'short_answer',
  foreignKey: 'user_id',
  otherKey: 'question_id'
});
db.ShortQuestion.belongsToMany(db.User, {
  through: 'short_answer',
  foreignKey: 'user_id',
  otherKey: 'question_id'
});

module.exports = db;