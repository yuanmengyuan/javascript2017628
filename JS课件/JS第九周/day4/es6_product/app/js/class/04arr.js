{
    //01:数组类上的方法；of,from()
    //001:of
    console.log(Array.of(1,2,3,4))
    //002:from:一个参数：类数组转数组  俩个参数：第二个参数可以遍历第一个数组或类数组；
    let aBtn=document.getElementsByTagName('button');
    //console.log(Array.from(aBtn));
    //遍历并且修改类数组
    Array.from(aBtn,(item=>item.innerHTML='教师节快乐'))
    //遍历并且修改数组
    let arr=[1,2,3,4]
    let res=Array.from(arr,item=>item*100);
   // console.log(res)

    //02:数组的遍历：for循环  for...of  entries keys

    //03:数组的查找和过滤：find,findIndex,filter
    let arr2=['a','b','c'];
    console.log(arr.find((item)=>item>=2))
    console.log(arr.findIndex((item)=>item>=2))
    console.log(arr.filter(item=>item>=2))

    //04:数组上的方法：fill  copyWithin includes
    let arr3=[1,2,3];
    //console.log(arr3.fill(0))
    //console.log(arr3.fill(0,1,2))
    //console.log(arr3.copyWithin(1,0,2))
    console.log(arr3.includes(2))
}