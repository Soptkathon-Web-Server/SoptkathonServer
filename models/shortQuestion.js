module.exports = (sequelize, DataTypes) => {
    return sequelize.define('short_answer', {
        question: {
            type: DataTypes.TEXT(),
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
};