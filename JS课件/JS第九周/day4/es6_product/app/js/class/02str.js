{
    //01：循环:for循环  for...of
    let str='你好啊\u857e';
    for(let val of str){
       // console.log(val)
    }
    //02：字符串模板和模板标签 ``
    let name='北京';
    let str2=`${name}欢迎你`;
    abc `${name}欢迎你`;
    function abc(target,v1) {
        console.log(v1)
    }
    //03:字符串新增方法
    //001:unicode编码
    let str3='北京';
    console.log(str3.charCodeAt(0));
    console.log(String.fromCharCode(21271));
    console.log(str3.codePointAt(0));
    console.log(String.fromCodePoint(21271));
    //002:字符串复制
    str3=str3.repeat(2);
    console.log(str3);
    //003：字符串填白:padStart padEnd
    name=name.padEnd(3,0);
    console.log(name)
    //004:开头和结尾 startsWith endsWith
    console.log(str3.startsWith('北京'))
    console.log(str3.endsWith('北京'))
    //005：类似转义符功能：
    let res=String.raw `北京\n你好`;
    console.log(res)
}