const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    hosts: 'localhost',
    dialect: 'mysql'
});

module.exports = db;