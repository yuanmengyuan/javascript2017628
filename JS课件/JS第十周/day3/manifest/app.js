let express=require('express');
let app=express();
app.listen(3000);
//静态资源服务器
app.use(express.static('public'));
//设置模版引擎html；
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

app.get('/test.html',(req,res)=>{
    res.render('test');
});