//定义一个express路由对象
const router  = require("express").Router()
const sequelize = require('../../util/mysqlDB');

function vipChart(){
    let result = {}
    equelize.query('select count(u.id) as count,v.vip from user u,vip v where u.vip_id = v.id  GROUP BY v.id',
        { type: sequelize.QueryTypes.SELECT }).then(function (results) {
        result = results;

    })
    return result
}
module.exports = vipChart()