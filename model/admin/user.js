let Sequelize = require('sequelize');

let sequelize = require('../../util/mysqlDB');

const DataTypes = Sequelize.DataTypes;
module.exports = sequelize.define('user', {
        id: {
            type: DataTypes.TINYINT,
            primaryKey: true,

        },
        user_name: {
            type: DataTypes.STRING

        },
        password: {
            type: DataTypes.STRING

        },
        role_id: {
            type: DataTypes.TINYINT,
        },
        state: {
            type: DataTypes.TINYINT

        }
    },
    {

        timestamps: false,
        freezeTableName: true
    }
);