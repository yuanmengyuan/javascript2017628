{
    //原始对象
    let obj={
        name:'lei',
        time:'2018/09/07',
        c:123
    };
    //代理
    let proxy=new Proxy(obj,{
        get(target,key){
            return target[key]
        },
        set(target,key,val){
            if(key==='name'){
                return target[key]=val;
            }else{
                //是什么值，还是什么值，中间不进行任何操作
                return target[key];
            }
        },
        has(target,key){
            if(key==='name'){
                return target[key];
            }else{
                return false;
            }
        },
        deleteProperty(target,key){
            if(key==='name'){
                delete target[key];
                return true;
            }else{
                return target[key];
            }
        },
        ownKeys(target){
           return  Object.keys(target).filter(item=>item!=='time')
        }
    });
    //获取
    //console.log(proxy.time)
    //设置
    //proxy.name='haha';
    //判断属性是否在对象上
    //console.log('time' in proxy)
    //删除
    //delete proxy.time;
    //console.log(proxy)
    //console.log(Object.keys(proxy))
    console.log(Reflect.get(proxy,'name'))
    Reflect.set(proxy,'name','122334');
    console.log(Reflect.has(proxy,'name'));
    //Reflect.deleteProperty(proxy,'name');
    console.log(Reflect.ownKeys(proxy));
}