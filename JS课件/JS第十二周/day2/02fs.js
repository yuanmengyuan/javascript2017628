const http=require('http');
const fs=require('fs');
http.createServer((req,res)=>{
    if(req.url==='/favicon.ico'){
        return;
    }
    if(req.url==='/read'){//如果请求读的话，做的操作....
        fs.readFile('./public/data1.txt',(err,data)=>{
            //通过req.url拿到请求的路径；
            if(err){
                res.end('文件读取失败');
            }
            console.log(data.toString());
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            res.end(data);
        })
    }else if(req.url==='/write'){
        fs.writeFile('./public/data2.txt','你很美，真的很美！！！！',err=>{
            //console.log()  console.error() console.info()
            if(err) throw err;
            console.log('文件写入成功');
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            res.end('文件写入成功')
        })
    }else{
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.end('404:该页面不存在')
    }

}).listen(3000)