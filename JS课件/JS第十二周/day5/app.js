const express=require('express');
const app=express();
const router=require('./controller');
//学数据库：增，删，改，查；
//增
app.get('/',router.add);
app.get('/find',router.find);
app.get('/update',router.update);
app.get('/remove',router.remove);
app.get('/count',router.count);
app.listen(3000);
