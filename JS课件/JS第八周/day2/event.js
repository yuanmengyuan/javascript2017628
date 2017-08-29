//on 绑定事件：绑定到自己的事件池；
function on(el,type,fn) {
    //自定义行为和系统行为
    if(/^my/g.test(type)){//自定义行为的事件绑定
        if(!el['my'+type]){
            el['my'+type]=[];
        }
        var a=el['my'+type];
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);
    }else{//系统行为的事件绑定
        //判断浏览器
        if(el.addEventListener){//标准浏览器
            el.addEventListener(type,fn,false);//冒泡
        }else{//IE浏览器
            //1:创建了自己的事件池
            if(!el['on'+type]){
                el['on'+type]=[];
                el.attachEvent('on'+type,function () {
                    run.call(el);
                })
            }
            var a=el['on'+type];
            //2:如果自己事件池没有这个方法，进行绑定
            for(var i=0; i<a.length; i++){
                if(a[i]===fn) return;
            }
            a.push(fn);

        }
    }
}
//fire通知:拿到数组，顺序调用；fire触发自定义行为上绑定的方法
//希望fire中的this是el;
function fire(type,e) {
    var a=this['my'+type]||[];
    if(a.length){
        for(var i=0; i<a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e)
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }

}
//run 拿到数组，顺序调用：触发系统行为上，绑定的方法
function run() {
    var e=window.event;
    e.target=e.srcElement;
    e.preventDefault=function () {
        e.returnValue=false;
    };
    e.stopPropagation=function () {
        e.cancelable=true;
    };
    e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
    e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
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
//off 解除绑定：拿到数组，进行匹配，把匹配到的赋值为null;
function off(el,type,fn) {
    if(/^my/.test(type)){//自定义行为
        var a=el['my'+type];
        if(a.length){
            for(var i=0; i<a.length; i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;
                    //break：阻断当前循环
                }
            }
        }
    }else{//系统行为
        if(el.removeEventListener){
            el.removeEventListener(type,fn,false);
        }else{
            var a=el['on'+type];
            if(a.length){
                for(var i=0; i<a.length; i++){
                    if(a[i]===fn){
                        a[i]=null;
                        break;
                        //break：阻断当前循环
                        //return：阻断整个函数；
                    }
                }
            }
        }
    }
}
function processThis(fn,thisArg) {
    return function (e) {
        fn.call(thisArg,e)
    }
}