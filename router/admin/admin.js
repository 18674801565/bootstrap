//定义一个express路由对象
const router = require("express").Router()
const sequelize = require('../../util/mysqlDB');
const crypto = require("crypto")

let data = {};
router.post('/admin/showInfo', async (req, res) => {

    //设置公共数据
    data.user = req.session.user;

    if (data != null) {
        res.render('admin/psw', data)
    } else {
        res.json({code: 200, msg: "操作异常！"})
    }

})
router.post("/admin/updatePsw", async (req, res) => {
    let userId = req.body.userId;
    //给密码加密
    let md5 = crypto.createHash('md5');
    let password = req.body.newPassword;
    password = md5.update(password,'utf-8').digest('hex');
    // console.log(userId,"-",password)
    console.log(crypto.createHash('md5').update(password).digest('hex'))
    //默认修改信息
    data.msg = "修改失败"
    //修改密码
    await sequelize.query(`update user set password='${password}' where id =${userId}`,
        {type: sequelize.QueryTypes.UPDATE}).then(function (results) {
        //console.log("results----:"+results)
        if (results[1] >= 0) {
            data.code = 200;
            data.msg = "修改成功！";
            //清除session
            req.session.destroy()
            return
        }
    }).catch(
        function(){
            return res.json({code: 500, msg: "操作失败！"})
        }
     );//异常捕获
    //console.log(req.session)
    data.msg = "修改成功！";
    data.code = 500;
   // console.log(data)

    return res.json(data)
})


module.exports = router;