const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    //fs.mkdir('./haha');
    fs.writeFile('./haha/data.txt',"你好，北京！",err=>{
        if(err) throw err;
        res.end('创建成功')
    })
});
server.listen(3000);