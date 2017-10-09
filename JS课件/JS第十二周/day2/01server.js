const http=require('http');

/*const server=http.createServer((req,res)=>{
    console.log('有人来了');
    res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
    //在end中，只能放字符串；
    res.end('有人来了')
});
server.listen(3000,'127.0.0.1');*/
http.createServer((req,res)=>{
    if(req.url==='/favicon.ico'){
        return;
    }
    console.log(req.url);
    res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
    console.log('有人来了111111');
    res.end('有人来了111111')
}).listen(3000);
