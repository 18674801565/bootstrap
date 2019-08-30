//定义一个express路由对象
const router = require("express").Router()
const sequelize = require('../../util/mysqlDB');
const userModel = require('../../model/admin/user')
const crypto = require("crypto")

let data = {};
//查询所有用户列表
router.post("/admin/userList", async (req, res) => {
    let user = req.session.user;
    if (user == null) {
        res.redirect("/sdmin/error")
    }
    let result = []
    let results_l = []
    data.count = 0
    //查询所有用户
    await userModel.findAndCountAll({
        limit: 6,
        offset: 0
    }).then(function (results) {
        console.log("results:")
        // console.log(results.rows[0])
        results_l = results.rows;
        data.count = results.count
    }).catch(
        function(){
            return res.json({code: 500, msg: "操作失败！"})
        }
    );//异常捕获

    for (let re of results_l) {
        result.push(re.dataValues)
    }
    console.log(result)
    if (result != null) {
        data.users = result;
        data.msg = "查询成功！";
    }
    console.log(data.count)
    data.users = result;
    res.render("admin/users", data)
})

//修改用户信息
router.post('/admin/alterUser', async (req, res) => {
    let userId = req.body.userId;
    //给密码加密
    let md5 = crypto.createHash('md5');
    let password = req.body.password;
    password = md5.update(password,'utf-8').digest('hex');

    let idMark = parseInt(req.body.idMark);
    let userName = req.body.userName;
    let state = parseInt(req.body.stateName);
 //   console.log(userId + "-" + userName + "-" + password + "-" + idMark + "-" + state)
    if (userId == null || userName == null || state == null || idMark == null || password == null) {
        return res.json({code: 500, msg: "数据不完整！"})
    }

    //修改用户
    if (state == 0) {
        //删除用户
        await deleteUserById(userId, res)
    }
    //修改用户
    await sequelize.query(`update user set user_name='${userName}',password='${password}',role_id='${idMark}',state=${state} where  id=${userId}`,
        {type: sequelize.QueryTypes.UPDATE}).then(function (results) {
     //   console.log("results:" + results)
        if (results[1] >= 0) {
            data.User = results;
            data.msg = "删除成功！";
        }
    }).catch(
        function(){
            return res.json({code: 500, msg: "操作失败！"})
        }
    );//异常捕获
    return res.json({code: 200, msg: "数据修改成功！"})
})

//删除用户
router.post('/admin/deleteUser', async (req, res) => {
    if (req.body.userId == null) {
        return res.json({code: 200, msg: "操作异常！"})
    }
    //删除用户
    deleteUserById(parseInt(req.body.userId), res)

})

//添加用户
router.post('/admin/addUser', async (req, res) => {
    //给密码加密
    let md5 = crypto.createHash('md5');
    let password = req.body.password;
    password = md5.update(password,'utf-8').digest('hex');
    let idMark = parseInt(req.body.idMark);
    let userName = req.body.userName;
    let state = parseInt(req.body.stateName);
    if (userName == null || userName == undefined || userName == "" || state == null || state == undefined ||
        password == null || password == undefined || idMark == null || idMark == undefined) {
        return res.json({code: 200, msg: "操作异常！"})
    }
    //查询用户是否存在
    let isExist = false;
    await  sequelize.query(`select * from user where user_name ='${userName}'`,
        {type: sequelize.QueryTypes.SELECT}).then(function (results) {

        if (results.length>0) {
         //   console.log(results)
            isExist = true;
        }
    }).catch(
        function(){
      return false;
        }
    );//异常捕获
    if(isExist){
        return res.json({code: 500, msg: "用户已存在！"})
    }
    //添加用户
    await sequelize.query(`insert into user(user_name,password,role_id,state) values('${userName}','${password}','${idMark}',${state})`,
        {type: sequelize.QueryTypes.INSERT}).then(function (results) {
        console.log("results:" + results)
        if (results[1] >= 0) {
            data.User = results;
            data.msg = "插入成功！";
        }
    }).catch(
        function(){
            return res.json({code: 500, msg: "操作失败！"})
        }
    );//异常捕获
    return res.json({code: 500, msg: "数据插入成功！"})

})

//用户分页查询
router.post("/admin/user/paging", async (req, res) => {

    //得到当前页数
    let currentPage = req.body.currentPage;
    //得到总页数
    let countPage = parseInt(req.body.countPage);

    let pageSize = parseInt(req.body.pageSize);
    let result = []
    let results_l = []
    let offset = (currentPage - 1) * pageSize;
    //查询当前页
    await userModel.findAndCountAll({
        limit: pageSize,
        offset
    }).then(function (results) {
        console.log("results:")
        // console.log(results.rows[0])
        results_l = results.rows;
        data.count = results.count
    }).catch(
        function(){
            return res.json({code: 500, msg: "操作失败！"})
        }
    );//异常捕获

    for (let re of results_l) {
        result.push(re.dataValues)
    }
    console.log(result)
    if (result != null) {
        data.users = result;
        data.msg = "查询成功！";
    }
 //   console.log(data.count)
    data.users = result;
    res.render("admin/paging", data)
})

function deleteUserById(id, res) {
    sequelize.query(`delete from user where id=${id}`,
        {type: sequelize.QueryTypes.DELETE}).then(function (results) {
     //   console.log("results:" + results)
        if (results == undefined) {
            data.User = results;
            data.msg = "删除成功！";
        }
    }).catch(
        function(){
            return res.json({code: 500, msg: "操作失败！"})
        }
    );//异常捕获
    return res.json({code: 500, msg: '数据删除成功!'})
}

module.exports = router;