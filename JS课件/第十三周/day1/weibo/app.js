const express=require('express');
const router=require('./controller');
const session=require('express-session');
const app=express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(express.static('./avatar'));
app.listen(3000);

//路由表；
//显示首页
app.get('/',router.showIndex);
//显示注册页面
app.get('/regist',router.showRegist);
//执行注册功能；
app.post('/doRegist',router.doRegist);
//显示登陆页面；
app.get('/login',router.showLogin);
//执行登陆功能
app.post('/doLogin',router.doLogin);
//退出账号功能
app.get('/logout',router.logout);
//显示头像上传页面；
app.get('/upload',router.upload);
//执行上传功能；
app.post('/doUpload',router.doUpload)
