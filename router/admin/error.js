//定义一个express路由对象
const router = require("express").Router()

router.get('/admin/error', async (req, res) => {
    //响应index页面
    res.render('admin/error')
})

//无效地址处理
router.get('/admin/*', async (req, res) => {
    //响应index页面
    res.render('admin/common/lose')
})
router.post('/admin/*', async (req, res) => {
    //响应index页面
    res.render('admin/common/lose')
})
module.exports = router;