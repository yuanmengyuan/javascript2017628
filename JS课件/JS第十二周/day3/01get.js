const http=require('http');
const querystring=require('querystring');
const url=require('url');
http.createServer((req,res)=>{
    //面试题：如何解析地址栏的参数，请写出你的思路；
    //思路1：使用字符串转数组的一些方法；
    /*if(req.url==='/favicon.ico'){
        return;
    }
    let urlQuery=req.url.split('?')[1];
    let ary=urlQuery.split('&');
    let obj={};
    for(var i=0; i<ary.length; i++){
        let ary2=ary[i].split('=');
        console.log(ary2);
        obj[ary2[0]]=ary2[1];
    }*/
    //思路2：正则；
    /*if(req.url==='/favicon.ico'){
        return;
    }
    let obj={};
    req.url.replace(/([^?&=]+)=([^?&=]+)/g,($0,$1,$2)=>{
        obj[$1]=$2;
    });*/
    //思路3：querystring
    /*let urlQuery=req.url.split('?')[1];
    let obj=querystring.parse(urlQuery);*/
    //思路4：url
    let obj=url.parse(req.url,true).query;
    console.log(obj)
    res.end('ok')
}).listen(3000);