const express=require('express');
const app=express();
const router=require('./controller/router');
//设置模版引擎
app.set('view engine','ejs');
//静态资源服务器
app.use(express.static('./public'));
app.use(express.static('./uploads'));

//路由；
app.get('/',router.showIndex);
app.get('/:album',router.showImg);
app.get('/up',router.showUp);
app.post('/up',router.doUp)
//当所有路径都失败的时候，说明页面不存在，走404页面；
app.use((req,res)=>{
    res.render('404');
});
app.listen(3000);
