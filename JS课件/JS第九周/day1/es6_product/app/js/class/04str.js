{//字符串
    //字符串循环：for...of
    let str='你好啊：\u857e 123';
    /*for(let i=0; i<str.length; i++){
        console.log(str[i]);
    }*/
    for(let val of str){
        //console.log(val);
    }
   // let str="rgba("+Math.random(0,255)+","+Math.random(0,255)+","+Math.random(0,255)+",.4)";
    let name="张蕾";
    let say="hello";
    //02：模板字符串：1）用撇`` 2）变量${xxx}
    let str2=`${name}说了${say}`;
    //console.log(str2);
    //03:标签模板，获取模板字符串中的变量
    abc `${name}喜欢说${say}`;
    function abc(target,v1,v2) {
        console.log(v2)
    }
    //04:字符串编码的转换
    //05:includes；
    let str3='你好啊，北京';
    console.log(str3.includes('坏话'))
    //06:repeat重复的
    let str4='hello!'
    str4=str4.repeat(3);
    console.log(str4)
    //07 填充:padStart前面填充  padEnd后面填充
    let str5='8';
    //str5=str5.padStart(3,0);
    str5=str5.padEnd(3,88)
    console.log(str5)
    //String.raw 可以让\n之类的失效；
    console.log(String.raw `你好\n北京`)
    //startsWidth 和 endsWidth
    let str6='你好北京';
    console.log(str6.startsWith('你'))
    console.log(str6.endsWith('你好北京'))
}












