const sequelize = require('../config/config')
const { Sequelize, DataTypes, STRING} = require('sequelize');

const User = sequelize.define('User', {
    // Model attributes are defined here
    first_name:{
        type: DataTypes.STRING
    },
    last_name:{
        type: DataTypes.STRING
    },
    mdp:{
        type: DataTypes.STRING
    },
    age:{
        type:DataTypes.INTEGER
    },
    email:{
        type:DataTypes.STRING
    },
    is_mod:{
        type:DataTypes.BOOLEAN
    },
    Is_admin:{
        type:DataTypes.BOOLEAN
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        await User.sync({alter:true})
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


module.exports = User;