{
    @test('zIndex',12330)
    class Fn{
        @test2
        hello(){
            console.log('beijing')
        }
    }
    //修饰类，但不要传参；
    /*function test(target) {
        //修饰类：类是target
        target.id=123;
    }
    console.log(Fn.id)*/
    //修饰类：需要传参；
    function test(attr,value) {
        return function (target) {
            target[attr]=value;
        }
    }
    function test2(target,attr,desc) {
        console.log(desc)
        desc.writable=true;//true:可编辑  false：不可编辑；
    }
    let f1=new Fn();
    f1.hello=function () {
        console.log(123344445);
    }
    f1.hello();
    //console.log(Fn.zIndex)
}