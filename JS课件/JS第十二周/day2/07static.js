const http=require('http');
const url=require('url');
const path=require('path');
const fs=require('fs');
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

        getMime(extname,function (mime) {
            res.writeHead(200,{"Content-Type":mime});
        });
        res.end(data);
    })
}).listen(3000);

function getMime(extname,fn) {
    if(extname==='.ico') return;
    fs.readFile('./mime.json',(err,data)=>{
        if(err) throw err;
        data=JSON.parse(data.toString());
        data[extname]&& fn(data[extname]);
    })
}
