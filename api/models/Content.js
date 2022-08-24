const { DataTypes } = require("@sequelize/core");
const db = require("../database.js");

const Content = db.define('content',{
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
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },
    video: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.STRING
    },
    genre: {
        type: DataTypes.STRING
    }
},
    { timestamps: false }
);

module.exports = Content;