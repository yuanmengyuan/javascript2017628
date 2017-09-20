let express=require('express');
let app=express();
let https=require('https');
//注册一个html模板
app.engine('html',require('ejs').renderFile);
//设置模板引擎，为html模板；
app.set('view engine','html');
app.get('/',(req,res)=>{
    res.render('test')
});
app.get('/a2.html',(req,res)=>{
    res.render('a2');
});
//window.name
app.get('/b2.html',(req,res)=>{
    res.render('b2');
});
//postMessage
app.get('/c2.html',(req,res)=>{
    res.render('c2');
});
app.get('/d2.html',(req,res)=>{
    res.render('d2');
});

app.listen(3001);