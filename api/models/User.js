const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('user', {
        userId:{
            type: DataTypes.UUID,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        }
    },
        { timestamps: false });
}