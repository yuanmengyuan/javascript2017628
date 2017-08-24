//on:本质是把需要绑定的方法，都放到自定义事件池,给系统事件池添加的只有一个run方法；
function on(el,type,fn){
    //区分浏览器
    if(el.addEventListener){
        el.addEventListener(type,fn,false);
    }else{//IE
        if(!el['on'+type]){
            el['on'+type]=[];
            el.attachEvent('on'+type,function () {
                run.call(el);
            })
        }
        var a=el['on'+type];
        //去重判断
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);
    }
}
//run:本质，拿到数组，顺序调用
function run() {
    var e=window.event;
    var a=this['on'+e.type];
    if(a.length){
        for(var i=0; i<a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
//off:本质，拿到数组，让匹配的内容为null;
function off(el,type,fn) {
    if(el.removeEventListener){
        el.removeEventListener(type,fn,false)
    }else{
        var a=el['on'+type];
        if(a.length){
            for(var i=0; i<a.length; i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }
}
//需求：改变某个函数的this指向，并给函数传事件对象e的参数；
function processThis(fn,argThis) {
    return function (e) {
        fn.call(argThis,e)
    }
}

