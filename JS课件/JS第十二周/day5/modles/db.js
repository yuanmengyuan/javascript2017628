const MongoClient=require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/test';//数据库的地址；

function _connectDB(cb) {
    MongoClient.connect(url,(err,db)=>{
        if(err){
            cb('数据库连接失败');
            return;
        }
        cb(db);
    });
}
//批量导出；
module.exports={
    //增加一条数据；
    add(collectionName,json,cb){
        _connectDB(db=>{
            db.collection(collectionName).insertOne(json,(err,result)=>{
                if(err){
                    cb('数据插入失败',null)
                }else{
                    cb(null,result);
                }
                db.close();//断掉express和数据库的连接；
            })
        })
    },
    //查找数据：查找所有，精确查找，分页功能，排序功能；
    //json1:主要负责各种花式查找；
    //json2:分页，排序；
    find(collectionName,json1,json2,cb){
        if(arguments.length===3){
            cb=json2;
            json2={};
        }
        let page=Number(json2.page);//第几页；
        let limit=Number(json2.limit);//每页显示的条数；
        let sort=json2.sort||{};//排序规则
        _connectDB(db=>{
            var cursor =db.collection(collectionName).find(json1).skip(page*limit).limit(limit).sort(sort);
            let arrData=[];
            cursor.each((err,doc)=>{
                if(err){
                    cb('数据库查找失败',null);
                    return;
                }
                if(doc!=null){//有数据；
                    arrData.push(doc);
                }else{
                    cb(null,arrData);
                    db.close();//断掉数据库；
                }
            })
        })
    },
    //update更新数据；
    update(collectionName,json1,json2,cb){
        _connectDB(db=>{
            db.collection(collectionName).updateMany(json1,json2,(err,result)=>{
                cb(err,result);
                db.close();
            })
        })
    },
    //remove删除数据；
    remove(collectionName,json,cb){
        _connectDB(db=>{
            db.collection(collectionName).deleteMany(json,(err,result)=>{
                cb(err,result);
                db.close();
            })
        })
    },
    //count 求数据总数；
    count(collectionName,cb){
        _connectDB(db=>{
            db.collection(collectionName).find().count((err,count)=>{
                cb(err,count);
                db.close();
            })
        })
    }
};