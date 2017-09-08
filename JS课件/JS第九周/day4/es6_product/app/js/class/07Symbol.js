{
    //01:Symbol用来创建独一无二的值；
    let s1=Symbol();
    let s2=Symbol();
    console.log(s1===s2)
    //02:通过Symbol.for()让两个值相等
    let s3=Symbol.for('s3');
    let s4=Symbol.for('s3');
    console.log(s3===s4);
    //03:Symbol的值可以用来作为对象的属性,必须加上[]；
    let name=Symbol('lei')
    let obj={
        [name]:'tang',
        name:'123',
        c:456
    }
    //04：对象中函数Symbol的遍历；
    //for...of..entries不可以遍历Symbol的值；
    for(let [index,val] of Object.entries(obj)){
        console.log(index,val)
    }
    console.log(Object.getOwnPropertySymbols(obj))
    //用一步遍历对象，还得包含Symbol的值；
    Reflect.ownKeys(obj).forEach(item=>console.log(item));

}
