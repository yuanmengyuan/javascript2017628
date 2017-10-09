const files=require('../models/files');
const formidable=require('formidable');
const fs=require('fs');
module.exports={
    showIndex(req,res,next){
        //先拿到所有的文件夹，再赋值给参数albums
        // files.getAllAlbums(function (albums) {
        //     res.render('index',{
        //         albums
        //     })
        // })
        files.getAllAlbums()
            .then(albums=>{
                res.render('index',{
                            albums
                        })
            })
            .catch(err=>{
                console.log(err);
                next();
            })

    },
    showImg(req,res,next){
        //res.send(req.params.album)
        //拿到的是文件夹的名称
        let albumName=req.params.album;
        files.getAllImg(albumName)
            .then(imgs=>{
                res.render('img',{
                    albumName,
                    imgs
                })
            })
            .catch(err=>{
                next();
            })
    },
    showUp(req,res){
        files.getAllAlbums()
            .then(albums=>{
                res.render('up',{
                    albums
                })
            })
    },
    doUp(req,res,next){
        if (req.url == '/up' && req.method.toLowerCase() == 'post') {
            let form = new formidable.IncomingForm();
            form.uploadDir='./uploads';
            form.parse(req,(err,fields,files)=>{
                let wenjianjia=fields.wenjianjia;
                let oldpath=files.tupian.path;
                let newpath='./uploads/'+wenjianjia+'/'+files.tupian.name;
                //图片大小的判断；
                if(files.tupian.size>20000){
                    fs.unlink(oldpath,err=>{
                        if(err){
                            res.send('删除失败');
                            return;
                        }
                        res.send('图片尺寸太大，我帮你删掉了！');
                    })
                }else{
                    fs.rename(oldpath,newpath,err=>{
                        if(err){
                            console.log('改名失败');
                            next();
                            return;
                        }
                        //跳转页面；
                        res.redirect('/'+wenjianjia);
                    });
                }
            });
        }
    }
};