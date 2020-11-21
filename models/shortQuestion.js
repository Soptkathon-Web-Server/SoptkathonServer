module.exports = (sequelize, DataTypes) => {
    return sequelize.define('short_question', {
        question: {
            type: DataTypes.TEXT(),
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
};