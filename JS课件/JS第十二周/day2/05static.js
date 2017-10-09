const http=require('http');
const url=require('url');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    if(req.url==='/favicon.ico'){
        return;
    }
    //获取到路径
    let urlObj=url.parse(req.url);
    let pathname=urlObj.pathname;
    //查找文件的路径名
    let filename=`./static${pathname}`;

    fs.readFile(filename,(err,data)=>{
        if(err) throw err;
        res.end(data);
    })
});
server.listen(3000);