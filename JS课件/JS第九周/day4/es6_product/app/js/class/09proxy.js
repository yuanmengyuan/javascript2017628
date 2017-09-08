{
    //原始对象
    let obj={
        name:'xixi',
        age:123,
        s:456
    };
    //代理
    let proxy=new Proxy(obj,{
        get(target,key){
            if(key==='name'){
                return target[key]
            }
        },
        set(target,key,val){
            if(key==='name'){
                return target[key]=val;
            }else{
                return target[key];
            }
        },
        has(target,key){
            if(key==='name'){
                return target[key]
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
            return Object.keys(target).filter(item=>item!=='name')
        }
    });
    //使用
    //console.log(proxy.age)
    proxy.age='dudu';
    console.log('age' in proxy)
    delete proxy.s;
    console.log(Object.keys(proxy));
    console.log(Reflect.get(proxy,'name'))
    Reflect.set(proxy,'name','haha');
    Reflect.deleteProperty(proxy,'name');
    console.log(Reflect.has(proxy,'name'));
    console.log(Reflect.ownKeys(proxy))
    //console.log(proxy)
}
