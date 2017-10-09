function getMime(extname) {
    if(extname==='.ico') return;
    return new Promise((resolve,reject)=>{
        fs.readFile('./mime.json',(err,data)=>{
            if(err) throw err;
            data=JSON.parse(data.toString());
            data[extname]&& resolve(data[extname]);
        })
    })
}
module.exports=getMime;
