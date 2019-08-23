//定义一个express路由对象
const router  = require("express").Router()
const sequelize = require('../../util/mysqlDB');

router.get('/admin',async(req,res)=>{
    console.info(req.session)
    if (!req.session || !req.session.isLogin) {
        return res.redirect('admin/login');
    }
   //响应index页面
    //设置公共数据
    let data ={};
    data.user = req.session.user;
    data.menus = req.session.menus;
    res.render("admin/index",data)
})

router.get('/admin/index',async(req,res)=>{

    // console.log(req.session.user)
    //获取请求参数
    let data = {};
    data.user = req.session.user;

    if(data.user!=null){

    //获取侧栏菜单列表数据
    let menus = [];
    await sequelize.query('SELECT * from menu',
        { type: sequelize.QueryTypes.SELECT }).then(function (results) {
        menus = results;
    })
    //拼装为前端需要的数据
    let menusVo = [];
    for (let m of menus) {
        if(m.parent_id==0){
            menusVo.push(m)
        }
    }
    for (let m of menusVo) {
        m.sonMenu =[];
        for (let mm of menus) {
            if(m.id==mm.parent_id){
                m.sonMenu.push(mm)
            }
        }
    }


        data.menus = menusVo;
      //侧栏设置到session
        req.session.menus = menusVo;
        // console.log(data)
        res.render("admin/common/common",data)
    }else {
        res.redirect("/admin/error");
    }
})
module.exports = router;