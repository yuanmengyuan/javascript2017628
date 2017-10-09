const db=require('../modles/db');
module.exports={
    add(req,res){
        //  MVC的思想，就是数据和视图不见面，通过控制器来合并数据+视图；
        //目的：添加数据；
        db.add('ymy',{
            "name":"leilei",
            "age":Math.round(Math.random()*80)
        },(err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        })
    },
    find(req,res){
        let json2=req.query;
        json2.sort={"age":-1};
        db.find('ymy',{},json2,(err,result)=>{
            res.send(result);

        })
    },
    update(req,res){
        db.update('ymy',{"age":{$gt:60}},{$set:{"age":188}},(err,result)=>{
            res.send(result);
        })
    },
    remove(req,res){
        db.remove('ymy',{"age":188},(err,result)=>{
            res.send(result);
        })
    },
    count(req,res){
        db.count('ymy',(err,count)=>{
            res.send(count.toString());
        })
    }
};