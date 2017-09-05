{
    //01:当对象中的属性名和属性值相同的时候，可以只写一个；
 let name="leilei";
 let sex='gril';
 let obj={
     name,
     sex
 };
  //console.log(obj)
    //02:对象中的属性名可以是变量；变量需要配合[];
    let obj2={
        [name]:123,
        name:456,
        say:'hello'
    };
 //03:对象中函数的写法
    let obj3={
        [name]:'love vivian',
        fn(){
            alert(this[name])
        }
    };
    //obj3.fn();
    //04：Object.is() 是严格比较；

    //console.log(Object.is(123,'123')) //它们数据类型不一样
    //console.log(Object.is([],[]))//地址不同
   //console.log(Object.is(NaN,NaN))
}
{
    // 05:对象克隆 Object.assign;
    let obj1={
        name:'haha',
        hobby:'ball'
    };
    /*let obj2={};
    for(var attr in obj1){
        obj2[attr]=obj1[attr];
    }*/
    let obj2=Object.assign({},obj1);
    obj2.name='vivian';
    //console.log(obj2);
    //console.log(obj1);
    //06对象的遍历；keys values entries
    /*for(let key of Object.keys(obj2)){
        console.log(key)
    }*/
    /*for(let val of Object.values(obj2)){
        console.log(val);
    }*/
    /*for(let [index,val] of Object.entries(obj2)){
        console.log(index,val)
    }*/
}
{
    //07:defineProperty() 涉及双向数据绑定的知识；
    let oTxt=document.getElementById('txt');
    let oDiv=document.getElementById('div');
    let obj={};
    Object.defineProperty(obj,'a',{
        get(){
            console.log('get init');
            return 233;
        },
        set(newAry){
            console.log('set init');
            oDiv.innerHTML=newAry;
            oTxt.value=newAry;
        }
    });
    oTxt.addEventListener('keyup',function(){
        //改数据
        obj.a=this.value;
    });
    obj.a='334555';
    console.log(obj.a)

}
