const http=require('http');
const formidable=require('formidable');
const fs=require('fs');
http.createServer((req,res)=>{
    if(req.url==='/' && req.method.toLowerCase()==='post'){
        let form=new formidable.IncomingForm();
        //把图片资源存放的路径；
        form.uploadDir='./uploads';
        form.parse(req,(err,fileds,files)=>{//fileds用来存放文本域：也就是普通的小数据
            //files用来存放大文件；
            console.log(files);
            let oldpath=files.tupian.path;
            let newpath='./uploads/'+files.tupian.name;
            //改名字；
            fs.rename(oldpath,newpath,err=>{
                if(err){
                    res.end('改名失败');
                    return;
                }
                res.writeHead(200, {'content-type': 'text/html'});
                res.end('改名成功')
            });
        })
    }
}).listen(3000);