{
    //01:Symbol独一无二的值；
    let s1=Symbol();
    let s2=Symbol();
    //02:让俩个symbol的值相等，用Symbol.for()
    let s3=Symbol.for('s3');
    let s4=Symbol.for('s3');
    //console.log(s1===s2);
    //console.log(s3===s4);
}
{
    //03:把Symbol的值作为变量；或作为对象的属性；
    let name=Symbol('leilei');
    let obj={
        [name]:'xixi',
        name:'haha',
        t:123
    };
    //通过for...of的entries|keys|values无法拿到Symbol的值；需要配合Object.getOwnPropertySymbols()才能拿到Symbol的值；
    /*for(let [index,val] of Object.entries(obj)){
        console.log(index,val);
    }
    console.log(Object.getOwnPropertySymbols(obj))*/
    //Reflect.ownKeys(obj).forEach(item=>console.log(item,obj[item]))
}