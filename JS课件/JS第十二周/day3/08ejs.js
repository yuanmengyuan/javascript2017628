const express=require('express');
const app=express();

app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index',{
        gua:["西瓜","哈密瓜","甜瓜","南瓜","冬瓜"],
        datas:[
            {
                name:'张蕾',
                hobby:'学习'
            },
            {
                name:'刘哲',
                hobby:'吃瓜'
            },
            {
                name:'蚊子',
                hobby:'画画'
            },
            {
                name:'子仪',
                hobby:'睡觉'
            }
        ]
    })
});
app.listen(3000);
