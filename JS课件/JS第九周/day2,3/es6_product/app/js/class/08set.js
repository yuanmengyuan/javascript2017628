{
    let s=new Set();
    let arr=[1,2,3,4,1,2,3,3];
    //数组去重
    //01:双重循环
    /*for(var i=0; i<arr.length; i++){
        for(var j=i+1; j<arr.length; j++){
            if(arr[i]===arr[j]){
                arr.splice(i,1);
                i--;
            }
        }
    }*/
    //02:sort排序
    /*arr.sort((a,b)=>a-b);
    for(var i=0; i<arr.length; i++){
        if(arr[i]===arr[i+1]){
            arr.splice(i,1);
            i--;
        }
    }*/
    //03:新数组
    /*let newArr=[];
    for(let i=0; i<arr.length; i++){
        if(newArr.indexOf(arr[i])===-1){
            newArr.push(arr[i])
        }
    }*/
    //04：利用对象不重名的特性；
    /*let obj={};
    for(let i=0; i<arr.length; i++){
        var cur=arr[i];
        if(obj[cur]){
            arr.splice(i,1);
            i--;
        }else{
            obj[cur]=cur;
        }
    }*/
    //05：利用对象求出现的次数
    /*var obj={};
    for(let i=0; i<arr.length; i++){
        let cur=arr[i];
        if(obj[cur]){
            obj[cur]++;
        }else{
            obj[cur]=1;
        }
    }
    var arr2=[];
    for(var attr in obj){
        arr2.push(Number(attr));
    }*/
    //06:set不重复的特性
    //console.log([...new Set(arr)])
    arr.forEach(item=>s.add(item));
    //console.log([...s])
    //console.log(Array.from(s))
    //类数组转数组有哪些思路？
    let aBtn=document.getElementsByTagName('button');
    //01:es5中的封装
    /*function makeArray(arg) {
        var ary=[];
        if('getComputedStyle' in window){
            ary=Array.prototype.slice.call(arg);
        }else{
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i]);
            }
        }
        return ary;
    }*/
    //02:Array.from()
    //console.log(Array.from(aBtn))
    //03:扩展运算符
    //console.log([...aBtn]);
    //console.log(Array.of(...aBtn));
}
{
    //add delete clear() size  has
    let arr=[1,2,3,4];
    let s=new Set();
    //s.add(arr);
    //01：增加
    s.add(1);
    s.add('haha');
    s.add('xixi');
    //02：删除
    //s.delete('haha');
    //s.clear();
    //console.log(s.has('haha'))
    //set实例的遍历方法：1）for..of 2)keys values entries 3)forEach
    /*for(let val of s){
        console.log(val)
    }*/
    //console.log(s)
    /*for(let [index,val] of s.entries()){
        console.log(index,val)
    }
    let ws=new WeakSet();
    let obj={};
    let arr123=[1,2,3];
    function fn() {

    }
    fn.aa=123;
    ws.add(fn);
    console.log(ws)*/
    [...s].map(item=>console.log(item));
    Array.from(s).filter(item=>console.log(item))
    Array.of(...s).filter(item=>console.log(item))
}











