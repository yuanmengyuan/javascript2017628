{
    //01：创建set实例，并添加数据
    let s=new Set();
    let arr=[1,2,3,4,4,5];
    arr.forEach(item=>s.add(item));
    //console.log([...s])
    //02：数组去重的思路：1）双重循环 2）sort排序 3）新数组 4）对象不重名的特性 5）利用对象记录重复次数 6）Array.from()+配合set 7)扩展运算符
    Array.from(new Set(arr));
    //console.log([...new Set(arr)])

    //03：set的方法:add has delete clear size
    //add
    let s2=new Set();
    s2.add(1);
    //has
    //delete
    //s2.delete(1)
    s2.clear()
    console.log(s2)
    let s3=new Set(arr);
    //04:遍历：1）for...of  2)forEach  3)entries  4)keys 5)values 6)如果想使用map和filter，必须配合扩展原算符；
    let res=[...s3].filter(item=>item>=2);
    //console.log(res)
    //05: weakSet传值只能传对象；
    /*ws.add({});
    console.log(ws)*/
    /*let ws=new WeakSet();
    ws.add({});
    console.log(ws)*/
}
{//map的方法：get,set,delete,clear,has,size
    //map的遍历方式，跟set一样；
    let map=new Map();
    let arr=[1,2,3];
    //增加
    map.set('a',arr);
    //获取
    console.log(map.get('a'));
    //判断有没有
    console.log(map.has('a'));
    //删除
    map.delete('a');
    console.log(map)
}
