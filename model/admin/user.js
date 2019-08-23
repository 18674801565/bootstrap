let Sequelize = require('sequelize');

let sequelize = require('../../util/mysqlDB');

const DataTypes = Sequelize.DataTypes;
module.exports = sequelize.define('user', {
    id : {
        type: DataTypes.TINYINT,
        primaryKey: true,

    },
    user_name: {
        type: DataTypes.STRING

    },
    password: {
        type: DataTypes.STRING

    },
    state: {
        type: DataTypes.TINYINT

    }},
   {
       tableName:'user',
       timestamps:false,
       freezeTableName:true
   }
);