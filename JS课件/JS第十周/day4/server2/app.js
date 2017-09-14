let express=require('express');
let https=require('https');
let app=express();
//设置html的模板引擎
//自定义模板引擎 html
app.engine('html',require('ejs').renderFile);
//设置模板引擎为html模板
app.set('view engine','html');

//location.hash
app.get('/a2.html',(req,res)=>{
    res.render('a2');
});

//location.hash
app.get('/b2.html',(req,res)=>{
    res.render('b2');
});
//window.name跨域
app.get('/c2.html',(req,res)=>{
    res.render('c2');
});
//postMessage
app.get('/d2.html',(req,res)=>{
    res.render('d2');
});
app.get('/e2.html',(req,res)=>{
    res.render('e2');
});


app.listen(3001);