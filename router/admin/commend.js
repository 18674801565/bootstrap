//定义一个express路由对象
const router  = require("express").Router()

router.get('/commend',async(req,res)=>{
   //响应index页面
    res.render('admin/commend')
})
module.exports = router;