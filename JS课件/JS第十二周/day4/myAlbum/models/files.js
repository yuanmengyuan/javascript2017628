const fs=require('fs');
module.exports={
    //获取uploads文件夹下所有的文件夹；
    getAllAlbums(){
        return new Promise((resolve,reject)=>{
            fs.readdir('./uploads',(err,files)=>{
                if(err){
                    return reject('文件夹读取失败');
                }
                let arr=[];
                //同步的写法：从所有的文件中，过滤出文件夹；
                /*for(var i=0; i<files.length; i++){
                    //同步；
                    let stats=fs.statSync('./uploads/'+files[i]);
                    if(stats.isDirectory()){
                        arr.push(files[i])
                    }
                }
                console.log(arr);
                cb(arr);*/
                //异步回调的写法；
                /*(function iterator(i) {
                    if(i>=files.length){
                        console.log(arr);
                        cb(arr);
                        return;
                    }
                    fs.stat('./uploads/'+files[i],(err,stats)=>{
                        if(stats.isDirectory()){
                            arr.push(files[i])
                        }
                        iterator(++i)
                    })
                })(0);*/
                (function iterator(i) {
                    if(i>=files.length){
                        return resolve(arr);
                    }
                    fs.stat('./uploads/'+files[i],(err,stats)=>{
                        if(stats.isDirectory()){
                            arr.push(files[i])
                        }
                        iterator(++i)
                    })
                })(0);

            })
        })
    },
    getAllImg(albumName){
        return new Promise((resolve,reject)=>{
            //读取该文件夹下，所有的文件；
            let filename='./uploads/'+albumName;
            fs.readdir(filename,(err,files)=>{
                if(err){
                    return reject('文件读取失败');
                }
                let arr=[];
                //判断每个图片是否为图片文件；
                (function iterator(i) {
                    if(i>=files.length){
                       return  resolve(arr);
                    }
                    fs.stat(filename+'/'+files[i],(err,stats)=>{
                        if(stats.isFile()){
                            arr.push(files[i]);
                        }
                        iterator(++i);
                    })
                })(0);
            })


        })
    }
};