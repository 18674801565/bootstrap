//定义一个express路由对象
const router = require("express").Router()
const sequelize = require('../../util/mysqlDB');

let data = {};
router.post("/admin/role", async (req, res) => {

    data.role = []
    //查询角色
    await sequelize.query(`select * from role`,
        {type: sequelize.QueryTypes.SELECT}).then(function (results) {
        console.log("results:" + results)
        if (results != null) {
            data.role = results;
            data.msg = "查询成功！";
        }
    }).catch(
        function(){
            return res.json({code: 500, msg: "操作失败！"})
        }
    );//异常捕获

    //设置角色列表

    res.render("admin/role", data)
})

router.post('/admin/alterRole', async (req, res) => {
    let roleId = req.body.roleId;
    let roleName = req.body.roleName;
    let state = parseInt(req.body.stateName);

    if (roleId == null || roleName == null || state == null) {
        return res.json({code: 500, msg: "数据不完整！"})
    }

    //修改角色
    if (state == 0) {
        //删除角色
        await deleteRoleById(roleId, res)
    }
    //修改角色
    await sequelize.query(`update role set role='${roleName}',state=${state} where  id=${roleId}`,
        {type: sequelize.QueryTypes.UPDATE}).then(function (results) {
        console.log("results:" + results)
        if (results[1] >= 0) {
            data.role = results;
            data.msg = "删除成功！";
        }
    }).catch(
        function(){
            return res.json({code: 500, msg: "操作失败！"})
        }
    );//异常捕获
    return res.json({code: 500, msg: "数据修改成功！"})
})

router.post('/admin/deleteRole', async (req, res) => {
    if (req.body.roleId == null) {
        return res.json({code: 500, msg: "操作失败！"})
    }
    //删除角色
    deleteRoleById(parseInt(req.body.roleId), res)

})

//添加角色
router.post('/admin/addRole', async (req, res) => {
    let roleName = req.body.roleName;
    let state = parseInt(req.body.stateName);
    if (roleName == null || roleName == undefined || roleName == "" || state == null || state == undefined) {
        return res.redirect('admin/error')
    }
    //查询角色是否存在
    let isExist = false;
    await  sequelize.query(`select * from role where role ='${roleName}'`,
        {type: sequelize.QueryTypes.SELECT}).then(function (results) {

        if (results.length>0) {
            console.log(results)
            isExist = true;
        }
    }).catch(
        function(){
            return false;
        }
    );//异常捕获
    if(isExist){
        return res.json({code: 500, msg: "角色已存在！"})
    }
    //添加角色
    await sequelize.query(`insert into role(role,state) values('${roleName}',${state})`,
        {type: sequelize.QueryTypes.INSERT}).then(function (results) {
        console.log("results:" + results)
        if (results[1] >= 0) {
            data.role = results;
            data.msg = "插入成功！";
        }
    }).catch(
        function(){
            return res.json({code: 500, msg: "操作失败！"})
        }
    );//异常捕获
    return res.json({code: 500, msg: "数据插入成功！"})

})

function deleteRoleById(id, res) {
    sequelize.query(`delete from role where id=${id}`,
        {type: sequelize.QueryTypes.DELETE}).then(function (results) {
        console.log("results:" + results)
        if (results == undefined) {
            data.role = results;
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