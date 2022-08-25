const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('content', {
        contentId:{
            type: DataTypes.UUID,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        video: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        { timestamps: false }
    );
}