const sequelize = require('../config/config')
const { Sequelize, DataTypes, STRING} = require('sequelize');

const User_Comp = sequelize.define('Users_Comp', {
    // Model attributes are defined here

    name:{
        type: DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    mdp:{
        type: DataTypes.STRING
    },

});

(async () => {
    try {
        await sequelize.authenticate();
        await User_Comp.sync({alter:true})
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


module.exports = User_Comp;