module.exports = (sequelize, DataTypes) => {
    return sequelize.define('short-answer', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        answer: {
            type: DataTypes.TEXT(),
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
};