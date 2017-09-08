{
    //01：创建正则:正则只跟字符串打交道
    let reg1=new RegExp(/^2\d{2}$/g);
    let reg2=new RegExp('^2\\d{2}$','g')
    //console.log(reg2.test('234'));
    //02:正则的属性：flags global sticky lastIndex
    //console.log(reg2.flags)
    //console.log(reg2.global)
    let str='aaa_aaa_aa';
    let reg3=/a+/g;
    let reg4=/a+/y;
    console.log(reg3.lastIndex)
    console.log(reg3.exec(str),reg4.exec(str));
    console.log(reg3.lastIndex)
    console.log(reg3.exec(str),reg4.exec(str));
    //03:修饰符：g i  m   y   u
    let reg5=/^\u{857e}$/u;
    console.log(reg5.test('蕾'));
}