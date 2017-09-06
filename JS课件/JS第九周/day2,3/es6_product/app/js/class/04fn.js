{
    let aBtn=document.getElementsByTagName('button');
    //01:函数的默认参数用"="
    /*function fn(a) {
        a=a||10;
        alert(a)
    }
    fn();*/
    /*function fn(a=10) {
        alert(a)
    }
    fn(23)*/
    //02当参数不确定的时候，用...rest来接收其余的参数；rest拿到的是数组
    /*function fn(a,b,...rest) {
        console.log(a+b)
        console.log(rest)
    }
    fn(1,2,3,4,5)*/
    //03 面试：求数组中的最大值；
    let arr=[12,2,13,24,81,4];
    //思路1：假设法
    /*let max=0;
    for(var i=0; i<arr.length; i++){
        if(arr[i]>max){
            max=arr[i];
        }
    }
    console.log(max);*/
    //思路2：排序
    /*arr.sort((a,b)=>a-b);
    let max=arr[arr.length-1];*/
    //思路3：Math.max
    //let max=eval(`Math.max(${arr.toString()})`);
    //思路4：apply
    //let max=Math.max.apply(window,arr);
    //思路5：扩展运算符
    //let max=Math.max(...arr)

    //console.log(max)
    //console.log(arr,...arr)
    //console.log(...aBtn)
    /*let fn=a=>a;//表达式的写法
    let fn2=a=>{//函数体的写法
        return a;
    }
    console.log(fn(3));*/
    var fn3=()=> {
        //console.log(this);
    };
    fn3();
}