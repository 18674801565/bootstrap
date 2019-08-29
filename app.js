const  express = require("express")
const bodyParser = require("body-parser")
const sessions = require("express-session")
const domain = require('domain');
const path = require('path');
// // session相关,将session存储到mongodb
// const MongoStore = require('connect-mongo')(sessions);
//express应用对象
const app = express()



const template = require("art-template")
//设置模板默认后缀
template.defaults.extname = '.html'
//缓存
template.defaults.cache = true
// //分页
// template.defaults.imports.pagination = utils.pagination;
//去掉art语法，主要是防止和vue冲突
template.defaults.rules = [template.defaults.rules[0]]


//X-Powered-By是网站响应头信息其中的一个，出于安全的考虑，一般会修改或删除掉这个信息
app.disable('x-powered-by')

//服务器渲染页面 ejs(这里设置为html)
//设置视图引擎
app.set('view engine', 'html');
app.engine('html', require('express-art-template'))


//挂载托管静态资源
app.use('/static',express.static(path.join(__dirname,'static')))

//挂载请求体模块bodyParser
// parse application/x-www-form-urlencoded
//返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({extended:true}))
//此处错了将相应不了数据
app.use(bodyParser.json())

//session内存存储,必须放在路由配置前
app.use(sessions({
    secret: 'mandb',
    resave: true,
    saveUninitialized: true,
    // store: new MongoStore({
    //     url: 'mongodb://localhost:27017/mandb',
    //     touchAfter: 24 * 3600   // 通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
    //
    // })
}))

//跨域
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*"); //允许所有访问者跨域请求
    next();
})

//异常捕获
app.use((req, res, next) => {
    const reqDomain = domain.create();
    // next抛出的异常在这里被捕获,触发此事件
    reqDomain.on('error', e => {
        // ... 这里统一处理错误，比如渲染或跳转到404，500页面
        let data ={code:500,msg:e}
        res.render("/admin/common/error",data)
    });

    return reqDomain.run(next);
});

//挂载路由
app.use(require("./router/admin/index"))
app.use(require("./router/admin/login"))
app.use(require("./router/admin/commend"))
app.use(require("./router/admin/admin"))
app.use(require("./router/admin/role"))
app.use(require("./router/admin/user"))
app.use(require("./router/admin/error"))

let port = 3000;
app.listen(port,function(){
   console.log("service start in port:"+port)
})


//异常捕获打印
process.on('uncaughtException', (e,req, res, next) => {
    console.log(e.stack);
})