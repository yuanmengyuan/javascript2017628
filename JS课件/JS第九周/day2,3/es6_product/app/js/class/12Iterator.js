{//iterator：遍历器：保证所有的数据结构，采用统一的遍历方式；
    let arr=[1,2,3,4,5];
    let k=arr[Symbol.iterator]();
    //通过Symbol.iterator()返回的是一个对象，对象中有next()方法，next()中返回的是一个对象{value:值，done:boolean(是否遍历结束)}
    /*console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())
    console.log(k.next())*/
}
{//放对象具有for..of遍历的功能；
    let obj={
        arr1:[1,2,3],
        arr2:[4,5,6],
        [Symbol.iterator]() {
            let arr=this.arr1.concat(this.arr2);
            let n=0;
            return {
                next(){
                    return n<arr.length?{value:arr[n++],done:false}:{value:undefined,done:true};
                }
            }
        }
    }
    /*let k=obj[Symbol.iterator]();
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());
    console.log(k.next());*/
    for(let val of obj){
        console.log(val);
    }

}