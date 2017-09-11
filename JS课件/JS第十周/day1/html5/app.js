let express=require('express');
let app=express();
//设置我们使用的模板引擎是ejs模板；
app.set('view engine','ejs');
//接收请求：
app.get('/',(req,res)=>{
    //req:request 请求；
    //res:response 响应
    res.render('index');
});
app.get('/abc',(req,res)=>{
    res.send(req.query)
});
app.get('/form',(req,res)=>{
    res.render('01form')
})
//在3000端口号上跑
app.listen(3000);