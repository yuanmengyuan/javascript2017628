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
//jsonp的跨域
app.get('/jsonp',(req,res)=>{
    let data={
        "jsonp":"这是jsonp的数据：111111"
    };
    data=JSON.stringify(data);
    let cb=req.query.cb;//全局函数名称
    res.send(`${cb}(${data})`)
})
app.listen(3000);
//cors   cross-origin resource sharing
app.get('/cors',(req,res)=>{
    let data="这是cors的测试数据：22222"
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"http://localhost:63342"
    })
    res.end(data);
});
//server proxy
app.get('/topics',(req,res)=>{
    https.get('https://cnodejs.org/api/v1/topics',resp=>{
        let data='';
        resp.on('data',chunk=>{
            data+=chunk;
        });
        resp.on('end',()=>{
            res.send(JSON.parse(data));
        })
    })
});
//hash
app.get('/a1.html',(req,res)=>{
    res.render('a1');
});
app.get('/a3.html',(req,res)=>{
    res.render('a3');
});
//window.name;
app.get('/b1.html',(req,res)=>{
    res.render('b1');
});
app.get('/b3.html',(req,res)=>{
    res.render('b3');
});
//postMessage;
app.get('/c1.html',(req,res)=>{
    res.render('c1');
});
app.get('/d1.html',(req,res)=>{
    res.render('d1');
});