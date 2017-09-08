{
  //01:对象的简单写法:1)属性简单写法 2）函数简单写法；
  let name="lei";
  let sex="gril";
  let obj={
      name,
      sex,
      test(){
          //console.log(233)
      }
  }
  obj.test();
  //02对象的扩展运算符

  //03 对象的遍历：for..in     entries   keys values

  //04 对象上的方法:Object.is(); Object.assign(); Object.defineProperty()
    //001:判断两个值是否相等，属于严格比较
    let res=Object.is(123,'123');
    let res2=Object.is(NaN,NaN);
    //002:复制
    let obj2=Object.assign({},obj);
    obj2.name='tang';
    //003:双向数据绑定
    let obj3={};
    Object.defineProperty(obj3,'name',{
        get(){

        },
        set(newValue){
            document.getElementById('p').innerHTML=newValue;
            document.getElementById('txt').value=newValue;
        }
    });
    //当input内容改变的时候，我们改变数据；
    document.getElementById('txt').addEventListener('keyup',function () {
        obj3.name=this.value;
    })
    obj3.name='hahahhah';

}