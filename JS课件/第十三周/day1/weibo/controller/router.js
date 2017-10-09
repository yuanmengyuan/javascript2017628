const formidable=require('formidable');
const db=require('../models/db');
const md5=require('../models/md5');
const fs=require('fs');
const path=require('path');
module.exports={
    showIndex(req,res,next){
        res.render('index',{
            user:req.session.login?req.session.user:'',
            login:req.session.login,
            active:'index'
        });
    },
    showRegist(req,res,next){
        res.render('regist',{
            user:req.session.login?req.session.user:'',
            login:req.session.login,
            active:'regist'
        })
    },
    doRegist(req,res,next){
        //1：拿到客户端传过来的数据
        let form=new formidable.IncomingForm;
        form.parse(req,(err,fields,files)=>{
            let {user,pass}=fields;
            //对密码pass进行加密
            pass=md5(md5(pass)+'lei');
            //2:到数据库查找该用户是否存在？
            db.find('users',{user},(err,result)=>{
                if(err){
                    res.send({bok:false,msg:'error：服务器错误'});
                    return;
                }
                if(result.length){//说明用户名重复了；
                    res.send({bok:false,msg:'error：该用户名已经存在'});
                }else{//该用户不存在，可以进行注册；
                    db.insertOne('users',{user,pass},(err,result)=>{
                        if(err){
                            res.send({bok:false,msg:'error：服务器错误'});
                            return;
                        }else{
                            //现在可以通过session缓存用户名
                            req.session.user=user;
                            req.session.login=true;
                            res.send({bok:true,msg:'恭喜您：注册成功，将自动帮您跳转到首页'})
                        }
                    })
                }
            })
        })
    },
    showLogin(req,res,next){
        res.render('login',{
            user:req.session.login?req.session.user:'',
            login:req.session.login,
            active:'login'
        });
    },
    doLogin(req,res,next){
        //1：拿到客户端传过来的数据
        let form=new formidable.IncomingForm;
        form.parse(req,(err,fields,files)=>{
            let {user,pass}=fields;
            //对密码pass进行加密
            pass=md5(md5(pass)+'lei');
            //2:到数据库查找该用户是否存在？
            db.find('users',{user},(err,result)=>{
                if(err){
                    res.send({bok:false,msg:'error：服务器错误'});
                    return;
                }
                if(result.length){//说明该用户存在，继续比对密码
                    //必须拿加密后的密码跟加密后的密码进行比对
                    if(result[0].pass===pass){
                        req.session.user=user;
                        req.session.login=true;
                        res.send({bok:true,msg:'恭喜您：登陆成功，将自动帮您跳转到首页...'})
                    }else{
                        res.send({bok:false,msg:'error：密码不正确'});
                    }
                }else{//说明该用户不存在；
                    res.send({bok:false,msg:'error：该用户名不存在'});
                }
            })
        })
    },
    logout(req,res,next){
        req.session.user='';
        req.session.login=false;
        res.redirect('/');
    },
    upload(req,res,next){
        res.render('upload',{
            user:req.session.login?req.session.user:'',
            login:req.session.login,
            active:'upload'
        })
    },
    doUpload(req,res,next){
        let form=new formidable.IncomingForm;
        form.uploadDir='./avatar';
        form.parse(req,(err,fields,files)=>{
            let oldPath=files.avatar.path;
            let avatar=req.session.user+path.extname(files.avatar.name);
            let newPath='./avatar/'+avatar;
            //改名字；
            fs.rename(oldPath,newPath,err=>{
                if(!err){
                    //跳转到切图页面；
                    res.render('crop',{
                        avatar
                    });
                }
            })
        })
    }
};