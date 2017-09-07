{
    //Generator写法跟普通函数有两个区别：1）* 2）yield
    /*function* test() {
        yield 'a';
        yield 'b';
        return 'c';
    }
    let k=test();
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())*/
}
{
    let test=function* () {
        while(1){
            yield "a";
            yield "b";
            yield "c"
        }
    };
    let k=test();
    //console.log(k.next());
}
{
    let obj={
        arr1:[1,2,3],
        arr2:[4,5,6],
        [Symbol.iterator]:function* () {
            let arr=this.arr1.concat(this.arr2);
            let n=0;
            while(n<arr.length) {
                yield arr[n++]
            };
        }
    };
    let k=obj[Symbol.iterator]();
    /*console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())*/
    for(let val of k){
       // console.log(val)
    }
}
{
    let arr=[1,2,[3,4],[[5,6],[7,8]]];
    function * fn(arr) {
        for(var i=0; i<arr.length; i++){
            if(typeof arr[i]==='number'){
                yield arr[i];
            }else{
                //一个Generator函数中要调用另一个Generator，就必须写成 "yield* 函数名()"
                yield* fn(arr[i]);
            }
        }
    }
    let k=fn(arr);
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
}









