module.exports = (sequelize, DataTypes) => {
    return sequelize.define('short-answer', {
        question: {
            type: DataTypes.TEXT(),
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
};