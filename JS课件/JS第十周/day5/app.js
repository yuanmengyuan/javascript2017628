let express=require('express');
let app=express();
let server=require('http').createServer(app);
let io=require('socket.io')(server);
let obj={};
let dataBase=[];
let session=require('express-session');

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.get('/',(req,res)=>{
    if(!req.session.username){
        res.redirect('/reg');
    }else{
        res.render('index',{
            name:req.session.username,
            dataBase
        });
    }

});
//渲染注册页面；
app.get('/reg',(req,res)=>{
    res.render('register')
});
//执行注册功能；
app.get('/doReg',(req,res)=>{
    let username=req.query.username;
    let data=null;
    if(!obj[username]){//没有注册的话；
        obj[username]=username;//进行注册；
        //把数据存到session里面去
        req.session.username=username;
        res.send({"res":1,"des":"恭喜您，注册成功"});
    }else{//该用户已经存在；
        res.send({"res":0,"des":"sorry!该用户名已经存在"});
    }

});
//连接socket；
io.on('connection',socket=>{
    socket.on('msg',msg=>{
        dataBase.push({"data":msg})
        //socket.emit;
        //现在要通知所有人；
        io.emit('msg',msg);
    });
});
server.listen(3000);
