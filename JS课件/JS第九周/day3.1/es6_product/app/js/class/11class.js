{
    class F{
        constructor(num){//存放私有的属性和方法
            this.x=num;
        }
        //下面是公有的属性和方法；
        test(){
            console.log(this.x);
        }
    }
    class S extends F{
        constructor(num){
            super(num);
        }

    }
    let f1=new F(100);
    let s1=new S(200);
    //s1.test();
}
{
    class Parent{
        constructor(){
            this.a=1;
            this.b=[1,2,this.a];
            this.show=()=>{
                console.log(this.a,this.b)
            }
        }
    }
    class Child extends Parent{
        constructor(){
            super();
            this.a=2;
        }
    }
    let child=new Child();
    child.a=11;
    //child.show();//11 [1,2,1]
}
{
    class F{
        constructor(){}
        test(){//这里是给原型上设置公有的"方法"；只有"实例"才能使用
            console.log(123)
        }
        //给原型上设置和获取公有的"属性"；只有"实例"才能使用；
        set getName(name){
            this.name=name;
        }
        get getName(){
            return this.name
        }
        //给"类"上设置静态的"方法"；只有类才能使用
        static haha(){//这是类的静态方法；
            console.log('haha')
        }

    }
    let f1=new F;
    f1.name=345;
    console.log(f1.getName);
    F.zIndex=0; //给"类"上设置静态的"属性"，只有类才能使用
    /*f1.test();//test是原型上的，只能实例使用
    F.haha();//通过static可以设置类的静态方法，只有类可以使用；
    console.log(F.zIndex)*/
}