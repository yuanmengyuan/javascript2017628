const express=require('express');
const app=express();
app.listen(3000);
app.use(express.static('./public'));// /404.jpg
app.set('view engine','ejs');
/*app.get(/^\/student\/(\d{6})(\w{2})$/,(req,res)=>{
    res.send(`我的学号是：${req.params[0]}${req.params[1]}`)
});*/
/*app.get('/student/:username/:id',(req,res)=>{
    res.send(`这是${req.params.username}的学号：${req.params.id}`)
    //我们拿到id都是为了去数据库检索需要的内容的；
})*/
app.get('/:user/:id',(req,res,next)=>{
    /*res.send(`我是用户${req.params.user},我的账号是:${req.params.id}`)*/
    //检索数据库:先拿到用户名req.params.user；然后到（普通用户）数据库中找该用户是否存在；
    if(检索数据库){
        console.log(`我是用户${req.params.user},我的账号是:${req.params.id}`)
    }else{
        next();
    }
    /*console.log(`我是用户${req.params.user},我的账号是:${req.params.id}`)*/
});
app.get('/admin/:id',(req,res)=>{
    if(req.url==='/favicon.ico'){
        return;
    }
    /* res.send(`我是管理员，账号是:${req.params.id}`)*/
    console.log(`我是管理员，账号是:${req.params.id}`)
});
app.use((req,res)=> {
    res.render('404');
})