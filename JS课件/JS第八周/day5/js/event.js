function on(el,type,fn) {
    //区分自定义行为的绑定和系统行为的绑定
    if(/^my/.test(type)){//自定义行为
        //把所有要绑定的方法都存入到自定义事件池[];
        if(!el['my'+type]){
            el['my'+type]=[];
        }
        var a=el['my'+type];
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);
    }else{//系统行为
        //判断标准浏览器和IE浏览器；
        if(el.addEventListener){
            el.addEventListener(type,fn,false);//false：冒泡阶段
        }else{
            if(!el['on'+type]){
                el['on'+type]=[];
                el.attachEvent('on'+type,function () {
                    run.call(el);
                })
            }
            var a=el['on'+type]
            for(var i=0; i<a.length; i++){
                if(a[i]===fn) return;
            }
            a.push(fn);
        }
    }
}
function run() {
    var e=window.event;
    //e.target=e.srcElement;
    e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
    e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
    e.stopPropagation=function () {
        e.cancelBable=true;
    };
    e.preventDefault=function () {
        e.returnValue=false;
    };
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
//Fire中的this，指向el; 目的：拿到数组，顺序调用
function fire(type,e) {
    var a=this['my'+type]||[];
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
function off(el,type,fn) {
    if(/^my/.test(type)){//解除自定义行为的事件绑定；
        var a=el['my'+type];
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