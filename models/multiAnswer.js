module.exports = (sequelize, DataTypes) => {
    return sequelize.define('multi_answer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        first: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        second: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        third: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        fourth: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
};
