const http=require('http');
const url=require('url');
const path=require('path');
const fs=require('fs');
const getMime=require('./getMime');//自定义模块
http.createServer((req,res)=>{
    let urlObj=url.parse(req.url);
    let pathname=urlObj.pathname;
    let extname=path.extname(pathname);
    if(pathname==='/'){
        pathname='/index.html';
    }
    let filename='./public/weijinsuo'+pathname;
    fs.readFile(filename,(err,data)=>{
        if(err) throw err;

        getMime(extname)
            .then(mime=>{
                res.writeHead(200,{"Content-Type":mime})
            })
            .catch(err=>{
                throw err;
            });
        res.end(data);
    })
}).listen(3000);

