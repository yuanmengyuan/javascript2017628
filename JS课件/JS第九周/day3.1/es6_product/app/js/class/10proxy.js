{//proxy代理器；起的是一个过滤的作用；
    //原始对象
    let obj={
        name:'lei',
        time:'2017-9-6',
        c:123
    };
    //被proxy进行过滤操作；
    let proxy=new Proxy(obj,{
        //获取
        get(target,key){
            if(key==='name'){
                return target[key];
            }else{
                return '没有'
            }
        },
        //设置
        set(target,key,value){
            if(key==='name'){
                return target[key]=value;
            }else{
                return target[key];
            }
        },
        //判断属性的
        has(target,key){
            if(key==='name'){
                return target[key];
            }else{
                return false;
            }
        },
        //删除
        deleteProperty(target,key){
            if(key==='name'){
                delete target[key];
                return true;
            }else{
                return target[key];
            }
        },
        //过滤
        ownKeys(target){
            return Object.keys(target).filter(item=>item!=='name')
        }
    });
    //使用
    //01：获取
    //console.log('获取',proxy.time)
    //02：设置；
    //proxy.name='xixixi';
    //console.log('设置',proxy)
    //03:属性判断
    //console.log('name' in proxy)
    //04:删除属性
    //delete proxy.name;
    //console.log(proxy)
    //05：
    //console.log(Object.keys(proxy))
    //Reflect
    //01：获取
   //console.log(Reflect.get(proxy,'name'))
    //02：设置；
    Reflect.set(proxy,'name','beijing');
    //03:has
    //console.log(Reflect.has(proxy,'name'));
    //04:deleteProperty
    Reflect.deleteProperty(proxy,'name');
    //05:ownKeys
    //console.log(Reflect.ownKeys(proxy));
}