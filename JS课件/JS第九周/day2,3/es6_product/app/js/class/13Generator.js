{
    let test=function* () {
        console.log(1222)
        yield 'a';
        yield 'b';
        return 'c';
    }
    let k=test();
    /*console.log(k)
    console.log(k.next())
    console.log(k.next())*/
}
{
    let obj={
        arr1:[1,2,3],
        arr2:[4,5,6],
        [Symbol.iterator]:function* () {
            let arr=this.arr1.concat(this.arr2);
            let index=0;
            while(index<arr.length) {yield arr[index++]};
        }
    };
    /*let k=obj[Symbol.iterator]();
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());*/
    for(let val of obj){
        console.log(val)
    }

}