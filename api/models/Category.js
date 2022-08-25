const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('category', {
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
}