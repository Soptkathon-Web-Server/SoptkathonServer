module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        //모델의 Attributes (Column)을 정의하는곳
        nickname: {
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        salt: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
};