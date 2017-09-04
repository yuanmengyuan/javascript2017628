{
    //let reg=/^2\d{2}$/g;
    //let reg=new RegExp('^2\\d{2}$','g'); //两个参数
    let reg=new RegExp(/^2\d{2}$/ig);//一个参数
    //console.log(reg.test('234'))
    //console.log(reg.global) //判断是否全局
    //console.log(reg.flags) //flags:拿到修饰符
    let str='aaa_aa_aaa';
    let reg1=new RegExp(/a+/g);
    let reg2=new RegExp(/a+/y);//粘连模式
    //console.log(reg1.exec(str),reg2.exec(str));
    //console.log(reg1.exec(str),reg2.exec(str));
    //sticky:是否开启粘连模式；需要配合修饰符y来使用；
    //console.log(reg1.sticky,reg2.sticky)

    //u 修饰符：
    let reg3=/\u{857e}/u;
    console.log(reg3.test('蕾'))
}
