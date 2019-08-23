// //原生
// const mysql = require("mysql");
//
// let connection = mysql.createConnection({      //创建mysql实例
//     host:'127.0.0.1',
//     port:'3306',
//     user:'root',
//     password:'root',
//     database:'manager'
// });
// connection.connect();

//Sequelize框架
var Sequelize =  require('sequelize');
// database数据库名称   name 用户  password密码
var sequelize = new Sequelize('manager', 'root', 'root', {
    host: 'localhost',  //数据库域名
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
module.exports = sequelize;
