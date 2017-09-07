{//let和const
    //01;
    let aBtn=document.getElementsByTagName('button');
    for(let i=0; i<aBtn.length; i++){
        aBtn[i].onclick=function () {
            alert(i)
        }
    }
    //const
    const haha=123;
    //console.log(haha)
}
{//正则
    //01：正则的写法
    let reg1=/^2\d{2}$/g;
    let reg2=new RegExp(/^2\d{2}$/g);
    let reg3=new RegExp('^2\\d{2}$','g');
    //console.log(reg3.test('233'))
    //02：正则中的修饰符:u
    let reg4=new RegExp('\\u{857e}','u');
    //console.log(reg4.test('蕾'));
    //console.log(reg4.flags)
    //03：正则修饰符y:
    let str='aaaa_aaa_aaa';
    let reg5=new RegExp('a+','g');
    let reg6=new RegExp('a+','y');
    //console.log(reg5.exec(str),reg6.exec(str));
    //console.log(reg5.exec(str),reg6.exec(str));
    //04：正则的属性：lastIndex; flags; global; sticky是否开启粘连模式；
    //console.log(reg5.sticky,reg6.sticky)
}
{//字符串
    //01:字符串的遍历；
    let str='hello!\u857e';
    /*for(let i=0; i<str.length; i++){
        console.log(str[i])
    }*/
    for(let val of str){
        //console.log(val)
    }
    //02:模板字符串
    let name='糖宝宝';
    let say='我爱幼儿园';
    let str2=`我最爱${name}`;

    //03：模板标签：可以拿到模板中的变量；
    //console.log(str2)
    abc `我最爱的${name}说:${say}`;
    function abc(target,v1,v2) {
        console.log(v1,v2);
    }
    //04:字符串新增方法-》编码转换
    //05:复制；
    let str3='中秋吃月饼';
    console.log(str3.repeat(2))
    //06:填白；
    let str4='8';
    console.log(str4.padStart(3,0))
    //07:开始和结尾的判断
    console.log(str3.startsWith('中秋'))
    console.log(str3.endsWith('月饼'))

    //08
    let str5=`hello!\n北京`;
    //console.log(String.raw `hello!\n北京`)
}












