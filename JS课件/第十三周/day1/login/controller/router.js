const formidable=require('formidable');
const db=require('../models/db');
const md5=require('../models/md5');
module.exports={
    showLogin(req,res,next){
        res.render('login')
    },
    showRegist(req,res,next){
        res.render('regist');
    },
    doRegist(req,res,next){
        //1：拿到前端提交的数据；
        let form=new formidable.IncomingForm;
        form.parse(req,(err,fields,files)=>{
            let {user,pass}=fields;
            pass=md5(md5(pass)+'lei');
            //2:去数据库查找
            db.find('users',{user},(err,result)=>{
                if(err){
                    res.send({bok:false,msg:'error:服务器错误'});
                    return;
                }
                if(result.length){
                    res.send({bok:false,msg:'error:该用户名已经存在'});
                }else{//说明数据库中没有该用户；
                    //3:找不到才插入数据库
                    db.insertOne('users',{user,pass},(err,result)=>{
                        if(err){
                            res.send({bok:false,msg:'error:服务器错误'});
                        }else{
                            res.send({bok:true,msg:'恭喜您：注册成功！'});
                        }
                    })

                }

            })

        })

    },
    doLogin(req,res,next){
        let form=new formidable.IncomingForm;
        form.parse(req,(err,fields,files)=>{
            let {user,pass}=fields;
            pass=md5(md5(pass)+'lei');
            //2:去数据库查找
            db.find('users',{user},(err,result)=>{
                if(err){
                    res.send({bok:false,msg:'error:服务器错误'});
                    return;
                }
                if(result.length){//说明用户存在，还得比对密码；
                    if(result[0].pass===pass){
                        res.send({bok:true,msg:'恭喜您：登陆成功'})
                    }else{
                        res.send({bok:false,msg:'error:密码错误'});
                    }

                }else{// error：该用户名不存在；
                    res.send({bok:false,msg:'error:该用户名不存在'});
                }

            })

        })
    }
};
