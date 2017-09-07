function Parent(){
    this.b=[1,2,this.a];
    this.show=()=>{
        console.log(this.a,this.b)
    }
}
Parent.prototype.aa=123;
function Child(){
    Parent.call(this);
    this.a=2;
}
//Child.prototype=new Parent;
//Child.prototype=Object.assign({},Parent.prototype);
Child.prototype=Object.create(Parent.prototype);
Child.prototype.constructor=Child;
let child=new Child();
child.a=11;
child.show();
/*
console.log(child.constructor)*/
alert(child.aa)
//1）call继承 2）extend  3)原型链  4）寄生式组合继承 5）混合：(call+原型 ) (call+extend)