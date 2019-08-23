let Sequelize = require('sequelize');

let sequelize = require('../../util/mysqlDB');

const DataTypes = Sequelize.DataTypes;
module.exports = sequelize.define('menu', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        desc: {
            type: DataTypes.STRING
        },
        parent_id: {
            type: DataTypes.TINYINT
        },
        state: {
            type: DataTypes.TINYINT

        }},
    {
        tableName:'menu',
        timestamps:false,
        freezeTableName:true
    }
);