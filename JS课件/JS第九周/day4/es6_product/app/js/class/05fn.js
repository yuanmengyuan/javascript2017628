{
    //01：函数默认参数
    /*function fn(a=20) {
        //alert(a);
    }*/
    //02:不确定参数...rest;
    function fn(a,b,...rest) {
        console.log(a,b,rest)
    }
    //03:扩展运算符；运用：求数组中的最大值；
    let arr=[16,21,6,89,23];
    //求数组中最大值的思路：
    //001:sort排序
    //002:假设法
    //003:Math.max+apply
    //let max=Math.max.apply(null,arr);
    //004:Math.max+eval;
    //let max=eval(`Math.max(${arr.toString()})`)
    //005:扩展运算符
    //let max=Math.max(...arr);

    //04：箭头函数;箭头函数中的this，指向父级所在的this；
    let fn2=a=>a;
    let fn3=a=>{
        return a;
    };
    console.log(fn3(123))
}