let express=require('express');
let https=require('https');
let app=express();
//设置html的模板引擎
//自定义模板引擎 html
app.engine('html',require('ejs').renderFile);
//设置模板引擎为html模板
app.set('view engine','html');

app.get('/',(req,res)=>{
    res.render('index')
});
//server Proxy
app.get('/proxy',(req,res)=>{
    //服务器代理发起跨域请求；
    https.get('https://cnodejs.org/api/v1/topics',resp=>{
        let data='';
        resp.on('data',chunk=>{
            data+=chunk;
        });
        resp.on('end',()=>{
            //服务器把拿到的数据，返回给前端；
            res.send(JSON.parse(data))
        });
    })
});

//location.hash 跨域取数据；
app.get('/a1.html',(req,res)=>{
    res.render('a1');
});
app.get('/a3.html',(req,res)=>{
    res.render('a3');
});
//location.hash 跨域取数据
app.get('/b1.html',(req,res)=>{
    res.render("b1");
});
app.get('/b3.html',(req,res)=>{
    res.render("b3");
});
//window.name
app.get('/c1.html',(req,res)=>{
    res.render("c1");
});
app.get('/c3.html',(req,res)=>{
    res.render("c3");
});
//postMessage
app.get('/d1.html',(req,res)=>{
    res.render("d1");
});
app.get('/e1.html',(req,res)=>{
    res.render("e1");
});

app.listen(3000);