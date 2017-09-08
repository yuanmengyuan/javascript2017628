{
    //对类的修饰：传参的修饰，不传参的修饰，对原型上方法的修饰
    /*@test
    class Fn{

    }
    function test(target) {
        target.id=123;
    }
    console.log(Fn.id);*/
    @test('haha',456)
    class Fn{
        @testRead
        test(){
            console.log(1233);
        }
    }
    function test(attr,val) {
        return function (target) {
            target[attr]=val;
        }
    }
    function testRead(target,attr,des) {
        des.writable=false;
    }
    let f1=new Fn;
    f1.test();
    f1.test=function () {
        console.log(7899)
    }
}