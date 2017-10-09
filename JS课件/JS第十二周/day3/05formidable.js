const http=require('http');
const formidable=require('formidable');
const path=require('path');
const sd=require('silly-datetime');
const fs=require('fs');

http.createServer((req,res)=>{
    if(req.url==='/uploads' && req.method.toLowerCase()==='post'){
        //创建一个form对象
        let form=new formidable.IncomingForm();
        //图片存储的地方；
        form.uploadDir='./uploads';
        form.parse(req,(err,fields,files)=>{
            console.dir(files);
            let oldPath=files.tupian.path;
            let extname=path.extname(files.tupian.name);
            let t=sd.format(new Date(),'YYYYMMDDHHmmss');
            let newPath=form.uploadDir+'/'+t+extname;
            fs.rename(oldPath,newPath,err=>{
                if(err){
                    res.end('改名失败');
                    return;
                }
                res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                res.end('改名成功！！！')
            })

        })
    }
}).listen(3000);