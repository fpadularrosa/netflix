const { DataTypes } = require("@sequelize/core");
const db = require("../database.js");

const Category = db.define('category',{
    categoryId:{
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    category_name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
    { timestamps: false }
);

module.exports = Category;