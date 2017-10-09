const http=require('http');
const querystring=require('querystring');

http.createServer((req,res)=>{
    /*let str='';
    req.addListener('data',chunk=>{
        str+=chunk;
    });
    req.addListener('end',()=>{
        let obj=querystring.parse(str);
        console.log(obj);
        res.end('ok')
    });*/
    let str='';
    req.on('data',chunk=>{
        str+=chunk;
    });
    //当发生end事件的时候，代表数据已经拼接完成，拼接完成的数据是个字符串数据类型；
    req.on('end',()=>{
        let obj=querystring.parse(str);
        console.log(obj);
        res.end('ok')
    });
}).listen(3000);