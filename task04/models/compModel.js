const sequelize = require('../config/config')
const { Sequelize, DataTypes, STRING} = require('sequelize');
const Companie = sequelize.define('Companie', {
    // Model attributes are defined here
    name_companie:{
        type: DataTypes.STRING
    },
    description_comp:{
        type: DataTypes.STRING
    },
    website:{
        type:DataTypes.STRING
    },
    activity_area:{
        type:DataTypes.STRING
    },
    effective:{
        type:DataTypes.INTEGER
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        await Companie.sync({alter:true})
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


module.exports = Companie;