const sequelize = require('../config/config')
const { Sequelize, DataTypes, STRING} = require('sequelize');
const Applications = sequelize.define('Applications', {

    // Model attributes are defined here

    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    message:{
        type:DataTypes.STRING
    },
    ID_Mod:{
        type:DataTypes.INTEGER
    },
    ID_User:{
        type:DataTypes.INTEGER
    },

    ID_Ad:{
        type:DataTypes.INTEGER
    },
    job:{
        type:DataTypes.STRING
    },

});

(async () => {
    try {
        await sequelize.authenticate();
        await Applications.sync({alter:true})
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


module.exports = Applications;