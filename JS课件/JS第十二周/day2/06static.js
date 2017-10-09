const http=require('http');
const url=require('url');
const path=require('path');
const fs=require('fs');
http.createServer((req,res)=>{
    if(req.url==='./favicon.ico'){
        return;
    }
    //解析地址
    let urlObj=url.parse(req.url);
    let pathname=urlObj.pathname;//'/index.html  /xxx.png'
    let extname=path.extname(pathname);//文件的扩展名
    let filename='./public/weijinsuo'+pathname;//查找文件的路径
    fs.readFile(filename,(err,data)=>{
        if(err) throw err;
        getMime(extname,function (mime) {
            //设置响应头的mime类型；
            res.writeHead(200,{"Content-Type":mime})
        });
        /*getMime(extname)
            .then(mime=>{
                res.writeHead(200,{"Content-Type":mime})
            });*/
        res.end(data);

    })
}).listen(3000);
function getMime(extname,fn) {
    fs.readFile('./mime.json',(err,data)=>{
        data=JSON.parse(data.toString());
        data[extname] && fn(data[extname])
    })
    /*return new Promise((resolve,reject)=>{
        fs.readFile('./mime.json',(err,data)=>{
            data=JSON.parse(data.toString());
            data[extname] && resolve(data[extname])
        })
    })*/
}