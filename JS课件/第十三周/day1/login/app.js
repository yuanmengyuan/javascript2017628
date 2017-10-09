const express=require('express');
const router=require('./controller');
const app=express();
//设置模板引擎
app.set('view engine','ejs');
//静态资源服务器
app.use(express.static('./public'));
app.listen(3000);
//路由表
//显示登陆页面
app.get('/login',router.showLogin);
//执行登陆功能；
app.post('/doLogin',router.doLogin);
//显示注册页面
app.get('/regist',router.showRegist);
//执行注册功能
app.post('/doRegist',router.doRegist);