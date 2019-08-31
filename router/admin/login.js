//定义一个express路由对象
const router = require("express").Router()
const sequelize = require('../../util/mysqlDB');
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
    //权限判断

    if (user != null) {
        if(user.dataValues.role_id >2){
            return res.json({code: 500, msg: '权限不足,不能登录后台!'})
        }
        //读取权限
        let permission = {}
        permission.href = []
        await sequelize.query(`select rp.id,rp.role_id,p.permission_href,p.permission_name from role as r, permissions as p ,role_permission as rp 
where p.id =rp.permissions_id and r.id = rp.role_id and rp.role_id =${user.dataValues.role_id} and r.state = 1 GROUP BY rp.id`,
            {type: sequelize.QueryTypes.SELECT}).then(function (results) {
            for(let p of results){
                permission.href.push(p.permission_href)
            }
        })

        //设置session
        req.session.isLogin = true;
        req.session.user = user.dataValues;
        req.session.permission = permission;
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