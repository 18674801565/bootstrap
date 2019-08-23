//定义一个express路由对象
const router  = require("express").Router()

router.get('/admin/error',async(req,res)=> {
    //响应index页面
    res.render('admin/error')
})
module.exports = router;