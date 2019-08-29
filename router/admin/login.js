//定义一个express路由对象
const router = require("express").Router()
const connect = require("../../util/mysqlDB")
const userModel = require("../../model/admin/user")
const crypto = require("crypto")

router.get('/admin/login', async (req, res) => {
    //响应index页面
    res.render('admin/login')
})

//登录
router.post('/admin/toLogin', async (req, res) => {
    let user_name = req.body.username;
    //给密码加密
    let md5 = crypto.createHash('md5');
    let password = req.body.password;
    password = md5.update(password,'utf-8').digest('hex');
    console.log(password)
    //根据username，password查询
    let user = await userModel.findOne({where: {user_name, password}});
    //   console.log(user)
    if (user != null) {
        //设置session
        req.session.isLogin = true;
        req.session.user = user.dataValues;
        //   console.log(req.session)
        return res.json({code: 200, msg: '登录成功!', href: `/admin/index`});
    }

    return res.json({code: 510, msg: '账号密码错误,登录失败!'})
})

//注销
router.get("/admin/leave", async (req, res) => {
    req.session.destroy()
    res.redirect("/admin/login")
})

module.exports = router;