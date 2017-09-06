{
    let arr=[1,2,3];
    //01:map中的默认传参
    //let m=new Map([['a',arr],['b',2]]);
    let m=new Map();
    //增加
    m.set('a',arr);
    m.set('b',1);
    //删
   // m.delete('a')
    //改
    m.set('b',2);
    //查
    //console.log(m.get('b'));
    //清空
    //m.clear();
    //console.log(m.has('a'))
    //console.log(m.size)
    //console.log([...m])
    for(let val of m){
        //console.log(val);
    }
   //[...m].map(item=>console.log(item));
    let s1=new Set();
    let obj={"name":123,"haha":456};
    s1.add(obj);
    s1.delete(obj);
    console.log(s1)
}