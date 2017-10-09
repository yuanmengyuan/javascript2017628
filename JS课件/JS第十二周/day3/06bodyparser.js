const express=require('express');
const bodyParser=require('body-parser');
const app=express();
//中间件；
app.use(bodyParser.urlencoded({ extended: false}));
app.post('/',(req,res)=>{
    //req.query;--get请求
    //通过req.body拿到请求体；--post请求；
    let username=req.body.user;
    let sex=req.body.sex;
    console.log(username,sex);
    res.send('ok')
})
app.listen(3000);