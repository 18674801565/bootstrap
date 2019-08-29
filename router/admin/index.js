//定义一个express路由对象
const router = require("express").Router()
const sequelize = require('../../util/mysqlDB');

router.get('/admin', async (req, res) => {
    console.info(req.session)
    if (!req.session || !req.session.isLogin) {
        return res.render('admin/login');
    }
    //响应index页面
    //设置公共数据
    let data = {};
    data.user = req.session.user;
    data.menus = req.session.menus;
    res.render('/admin/index')
})

router.get('/admin/index', async (req, res) => {
    // console.log(req.session.user)
    //获取请求参数
    let data = {};
    data.user = req.session.user;

    if (data.user != null) {

        //获取侧栏菜单列表数据
        let menus = [];
        await sequelize.query('SELECT * from menu',
            {type: sequelize.QueryTypes.SELECT}).then(function (results) {
            menus = results;
        })
        //拼装为前端需要的数据
        let menusVo = [];
        for (let m of menus) {
            if (m.parent_id == 0) {
                menusVo.push(m)
            }
        }
        for (let m of menusVo) {
            m.sonMenu = [];
            for (let mm of menus) {
                if (m.id == mm.parent_id) {
                    m.sonMenu.push(mm)
                }
            }
        }
        let handleCount = {}
        let handleNum = {}
        handleNum.handleName = []
        handleNum.count = []
        //查询一月内操作报表
        await sequelize.query('select * from handle_count order by count DESC',
            {type: sequelize.QueryTypes.SELECT}).then(function (results) {
            handleCount = results;

        })

        for (let re of handleCount) {
            handleNum.handleName.push(re.handle_name);
            handleNum.count.push(re.count);
        }
        //vip报表
        let vip_result = {}
        let vipNum = {}
        vipNum.vipName = []
        vipNum.count = []
        await   sequelize.query('select count(u.id) as count,v.vip_name from user u,vip v where u.vip_id = v.vip  GROUP BY v.id',
            {type: sequelize.QueryTypes.SELECT}).then(function (results) {
            vip_result = results;
        })
        for (let re of vip_result) {
            vipNum.vipName.push(re.vip_name);
            vipNum.count.push(re.count);
        }
        //加入vip报表
        data.vipNum = vipNum;
        //加入操作报表数据
        data.handleNum = handleNum;

        //加入菜单
        data.menus = menusVo;
        //侧栏设置到session
        req.session.menus = menusVo;
        // console.log(data)

        res.render("admin/common/common", data)


    } else {
        res.render('admin/common/error', {code: 200, msg: "操作异常！"})
    }
})

//查询一月内操作报表
function findHandleCount() {
    sequelize.query('select * from handle_count order by count limit 10',
        {type: sequelize.QueryTypes.SELECT}).then(function (results) {
        handleCount = results;
    })
}

module.exports = router;