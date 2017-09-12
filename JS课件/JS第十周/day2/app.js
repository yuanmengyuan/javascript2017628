const express=require('express');
const app=express();

//设置模版引擎
app.set('view engine','ejs');
//添加一个请求
app.get('/',(req,res)=>{
    res.render('index');
});
app.listen(3000);