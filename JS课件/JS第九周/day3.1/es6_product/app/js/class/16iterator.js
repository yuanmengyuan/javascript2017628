{
    let arr=[1,2,3,4];
    /*let k=arr[Symbol.iterator]();
    //当Symbol.iterartor被调用后，拿到一个对象，对象中有方法 next();next()返回的是{value:xxx,done:xxx}
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())*/
}
{
    let obj={
        arr1:[1,2,3],
        arr2:[4,5,6],
        [Symbol.iterator](){
            let arr=this.arr1.concat(this.arr2);
            let n=0
            return {
                next(){
                    return n<arr.length?{value:arr[n++],done:false}:{value:undefined,done:true}
                }
            }
        }
    };
    /*let k=obj[Symbol.iterator]();
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())*/
    for(let val of obj){
        console.log(val)
    }
}