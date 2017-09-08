{
    //Symbol.iterator是一个表达式；array,string,map,set
    let arr=[1,2,3,4];
    let k=arr[Symbol.iterator]();
    /*console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())*/
}
{
    let obj={
        arr1:[1,2,3,3],
        arr2:[4,5,6],
        /*[Symbol.iterator](){//iterator的解决方式
            let arr=this.arr1.concat(this.arr2);
            let n=0;
            return {
                next(){
                    return n<arr.length?{value:arr[n++],done:false}:{value:undefined,done:true}
                }
            }
        }*/
        //Generator的解决方式
        [Symbol.iterator]:function* () {
            let arr=this.arr1.concat(this.arr2);
            let n=0;
            while(n<arr.length) yield arr[n++];
        }
    };
    for(let val of obj){
        //console.log(val)
    }
}
{
    let arr=[1,2,[[3]],[[4],[5]]];
    //递归+Generator来对数组进行深度遍历；
    function* fn (arr) {
        for (let i = 0; i < arr.length; i++) {
            let cur = arr[i];
            if (typeof cur === 'number') {
                yield cur;
            }else{
                yield * fn(cur);
            }
        }
    }
    let k=fn(arr);
    /*console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());*/
    for(let val of k){
        console.log(val)
    }
}














