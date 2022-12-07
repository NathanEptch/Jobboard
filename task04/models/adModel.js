const sequelize = require('../config/config')
const { Sequelize, DataTypes, STRING} = require('sequelize');
const Advertisement = sequelize.define('Advertisement', {

    // Model attributes are defined here

    ID_companie:{
        type:DataTypes.INTEGER
    },
    ID_people:{
        type:DataTypes.INTEGER
    },
    job:{
        type: DataTypes.STRING
    },
    description_adv:{
        type: DataTypes.STRING
    },
    date_adv:{
        type: DataTypes.DATE
    },
    place:{
        type:DataTypes.STRING
    },
    experience:{
        type:DataTypes.INTEGER
    },
    salaire:{
        type:DataTypes.INTEGER
    },
    company:{
        type:DataTypes.STRING
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        await Advertisement.sync({alter:true})
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


module.exports = Advertisement;