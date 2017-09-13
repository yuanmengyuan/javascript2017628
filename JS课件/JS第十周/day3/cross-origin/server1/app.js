const express=require('express');
const app=express();
const https=require('https');

//01：jsonp的接口
app.get('/jsonp',(req,res)=>{
    //准备数据
    let data={
        q:1,
        p:false,
        s:["1688阿里巴巴批发网","163","12306","163邮箱登陆","126","126邮箱登陆","139邮箱登陆","12306铁路客户服务中心","18号台风泰利","17173"]
    };
    data=JSON.stringify(data);
    //获取全局函数名；
    let cb=req.query.cb;
    console.log(req.query)
    res.send(`${cb}(${data})`)
});
//02:cors跨域资源共享；
app.get('/cors',(req,res)=>{
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"http://localhost:63342"
    });
    res.end('这是ajax请求的跨域数据')
});
//03:server proxy
app.get('/topics',(req,res)=>{
    //1:跨域资源共享
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"*"
    });
    //2:服务器代理；
    https.get('https://cnodejs.org/api/v1/topics',resp=>{
        let data='';
        resp.on('data',chunk=>{
            data+=chunk;
        });
        resp.on('end',()=>{
            res.end(data);
        })
    })
});

app.listen(3000);