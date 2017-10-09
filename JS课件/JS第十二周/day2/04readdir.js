const http=require('http');
const fs=require('fs');
//如何拿到当前文件夹下，所有的文件或文件夹；
//注意回调，因为回调属于异步；
http.createServer((req,res)=>{
    fs.readdir('./',(err,files)=>{
        let aryDir=[];
        /*for(var i=0; i<files.length; i++){
            console.log(files[i])
            //逐个验证每个文件的类型；
            fs.stat('./'+files[i],(err,stats)=>{
                if(stats.isDirectory()){
                    aryDir.push(files[i])
                }
            })
        }*/
        if(req.url==='./favicon.ico'){
            return;
        }
        (function Iterator(i){
            if(i>=files.length){
                console.log(aryDir);
                return;
            }
            fs.stat('./'+files[i],(err,stats)=>{
                if(stats.isFile()){
                    aryDir.push(files[i]);
                }
                i++;
                Iterator(i);
            })
        })(0);
    })
}).listen(3000);