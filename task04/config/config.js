const { Sequelize, DataTypes, STRING} = require('sequelize');
const sequelize = new Sequelize('Jobboard', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});

module.exports = sequelize;
