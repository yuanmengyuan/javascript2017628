{//数组
    let aBtn=document.getElementsByTagName('button');
    //01:Array.of();
    //console.log(Array.of(1,2,3,4))
    //Array.from():1)一个参数的时候：类数组转数组； 2）当两个参数的时候，第一个参数可以是（数组|类数组,第二个参数可以遍历第一个参数中的每一项；
    //console.log(aBtn);
    //02:aBtn=Array.from(aBtn); //类数组转数组
    //console.log(aBtn);
    //Array.from(aBtn,item=>item.innerHTML='888')
    //Array.from(aBtn,item=>console.log(item))
    //console.log(Array.from([1,2,3,4],item=>item*100))
    //03:实例方法fill:填充
    let arr1=[1,2,3];
    //arr1.fill(8);
    arr1.fill(8,1,3); //arg1:要填充的内容；arg2-arg3:从索引n到索引m，包前不包后；
   // console.log(arr1);
    let arr2=[1,2,3,4,5];//233  23445
    //04:是否包含；字符串中也有includes
    //console.log(arr2.includes(8))
    //05:copyWithin()
    arr2.copyWithin(0,1,4);//arg1:代表从哪个位置开始替换; arg2-arg3:替换的内容，包前不包后；
    //console.log(arr2)
    //06:数组遍历；
    let arr3=['花','好','月','正','圆'];
    //for循环  keys  values entries  for...of
    for(let val of arr3){
        //console.log(val)
    }
    for(let [index,val] of arr3.entries()){
       // console.log(index,val)
    }
    for(let index of arr3.keys()){
       // console.log(index)
    }
    //07数组过滤方法
    console.log(arr3.find(item=>item==='好'))
    //找到索引
    let index=arr3.findIndex(item=>item==='好');
    //删掉数组中对应的值；
    arr3.splice(index,1);
    console.log(arr3)
    let arr4=[1,2,3,4,5];
    console.log(arr4.findIndex(item=>item>=3));
    //filter:拿到满足条件的新数组；
    console.log(arr4.filter(item=>item>=3));
}