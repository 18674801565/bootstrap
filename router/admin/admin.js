//定义一个express路由对象
const router  = require("express").Router()
const sequelize = require('../../util/mysqlDB');

let data = {};
router.post('/admin/showInfo',async(req,res)=>{

    //设置公共数据
    data.user = req.session.user;

    if(data!=null){
        res.render('admin/psw',data)
    }else{
        res.redirect("admin/error")
    }

})
router.post("/admin/updatePsw",async(req,res)=>{
    let userId = req.body.userId;
    let password = req.body.newPassword;
    // console.log(userId,"-",password)

    //默认修改信息
    data.msg ="修改失败"
    //修改密码
    await sequelize.query(`update user set password=(${password}) where id =${userId}`,
        { type: sequelize.QueryTypes.UPDATE}).then(function (results) {
          //console.log("results:"+results)
        if(results[1]>=0){
            data .code = 200;
            data.msg = "修改成功！";
            //清除session
            req.session.destroy()
            return
        }
    }).catch(e => res.redirect("/error"));//异常捕获
     console.log(req.session)
     data.code = 500;
     console.log(data)

    return res.json(data)
})
router.post("/admin/role",async(req,res)=>{

    data.role = []
    //查询角色
    await sequelize.query(`select * from role`,
        { type: sequelize.QueryTypes.SELECT}).then(function (results) {
        console.log("results:"+results)
        if(results!=null){
            data.role = results;
            data.msg = "查询成功！";
        }
    }).catch(e => res.redirect("/error"));//异常捕获

    //设置角色列表

    res.render("admin/role",data)
})
router.post('/admin/alterRole',async(req,res)=>{
    let roleId = req.body.roleId;
    let roleName = req.body.roleName;
    let state = parseInt(req.body.stateName);

    if(roleId==null||roleName==null||state==null){
        return res.json({code:500,msg:"数据不完整！"})
    }

    //修改角色
    if(state==0){
        //删除角色
        await deleteRoleById(roleId,res)
    }
    //修改角色
    await sequelize.query(`update role set role='${roleName}',state=${state} where  id=${roleId}`,
        { type: sequelize.QueryTypes.UPDATE}).then(function (results) {
        console.log("results:"+results)
        if(results[1]>=0){
            data.role = results;
            data.msg = "删除成功！";
        }
    }).catch(e => res.redirect("/error"));//异常捕获
    return res.json({code:500,msg:"数据修改成功！"})
})

router.post('/admin/deleteRole',async(req,res)=>{
     if(req.body.roleId==null){
         return res.redirect('admin/error')
    }
    //删除角色
    deleteRoleById(parseInt(req.body.roleId),res)

})
//添加角色
router.post('/admin/addRole',async(req,res)=>{
    let roleName = req.body.roleName;
    let state = parseInt(req.body.stateName);
    if(roleName==null||roleName==undefined||roleName==""||state==null||state==undefined){
        return res.redirect('admin/error')
    }
    //添加角色
    await sequelize.query(`insert into role(role,state) values('${roleName}',${state})`,
        { type: sequelize.QueryTypes.INSERT}).then(function (results) {
        console.log("results:"+results)
        if(results[1]>=0){
            data.role = results;
            data.msg = "插入成功！";
        }
    }).catch(e => res.redirect("/error"));//异常捕获
    return res.json({code:500,msg:"数据插入成功！"})

})
function deleteRoleById(id,res){
     sequelize.query(`delete from role where id=${id}`,
        { type: sequelize.QueryTypes.DELETE}).then(function (results) {
        console.log("results:"+results)
        if(results==undefined){
            data.role = results;
            data.msg = "删除成功！";
        }
    }).catch(e => res.redirect("/admin/error"));//异常捕获
    return res.json({code:500,msg:'数据删除成功!'})
}
module.exports = router;