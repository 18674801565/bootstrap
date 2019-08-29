# 本系统需要安装node，以及mongodb（需启动服务）
+ 如不想装mongodb，请修改app.js中
app.use(sessions({
    secret: 'mandb',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb://localhost:27017/mandb',
        touchAfter: 24 * 3600   // 通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)

    })
}))
为
app.use(sessions({
    secret: 'mandb',
    resave: true,
    saveUninitialized: true,
   cookie:{maxAge:80*1000},		//设置cookie的过期时间，例：80s后session和相应的cookie失效过期
}))
并删除app.js中的
// session相关,将session存储到mongodb
const MongoStore = require('connect-mongo')(sessions);

+ 启动报模块未引入等错请删除mode_modules,在node下运行npm i

# 后台管理
version-0.0.3

# 添加功能
+ 加入列表
+ 加入图形报表
+ 加入node后台

# 后台编写
+ 已完成管理员密码，与角色部分，以及登录与注销

# version-1.0.1
+ 移除mongdb（注释掉了）
+ 新增报表
+ 新增加密
+ 错误页面统一处理
+ 修复部分bug

