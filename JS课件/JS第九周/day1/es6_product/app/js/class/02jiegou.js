{//数组的解构赋值
    //01:基础的解构
    let a,b,c,rest;
    [a,b]=[1,2];
    //02:rest
    [a,b,...rest] = [1,2,3,4,5];
    //console.log(a,b,rest);
    //03:默认值
    [a,b,c=10]=[1,2,18];
    //console.log(a,b,c)
    //04:逗号占位符；
    [a,,,,b]=[1,2,3,4,5];
    //console.log(a,b)
    //05：函数返回值
    function abc() {
        return [1,2,3,4,5];
    }
    [a,,,...rest]=abc();
    //console.log(a,rest)
    //应用场景：
    let e=123;
    let f=456;
    [e,f]=[f,e];
    //console.log(e,f)
}
{//对象的解构；
    //1:基础的解构
    //let {a,b}={a:1,b:2};
    //2:...rest;
    //let {a,b,...rest}={a:1,b:2,c:3,d:4};
    //console.log(a,b,rest)
    //3:默认复制
    //let {a,b=5}={a:1,b:12};
    //4:深度解构
    let data={
        state:0,
        result:[
            {name:'lei',say:'hello world'},
            {name:'tangbao',say:'pig'},
        ]
    };
    let{state,result:[{say},{name}]}=data;
    console.log(state,say,name)
}















