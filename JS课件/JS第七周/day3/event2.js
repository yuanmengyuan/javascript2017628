//1：绑定事件的时候，都绑定到自己的事件池；
function on(el,type,fn) {
    //浏览器兼容处理
    if(el.addEventListener){
        el.addEventListener(type,fn,false);
    }else{//IE
        //没有自己事件池，先创建一个
        if(!el['event'+type]){
            el['event'+type]=[];
            //为了解决重复绑定的问题
            el.attachEvent('on'+type,function () {
                run.call(el);
            })
        }
        var a=el['event'+type];
        //如果自己事件池去重,并且添加
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);

    }
}
//功能：循环调用自己事件池中的每个方法
function run() {
    //兼容处理
    var e=window.event;
    e.target=e.srcElement;
    e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
    e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
    e.preventDefault=function () {
        e.returnValue=false;
    };
    e.stopPropagation=function () {
        e.cancelBubble=true;
    };
    var a=this['event'+e.type];
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
//拿到自己事件池数组，比对谁等于fn，就将其赋值为null;
function off(el,type,fn) {
    //浏览器兼容处理
    if(el.removeEventListener){
        el.removeEventListener(type,fn,false);
    }else{//IE
        var a=el['event'+type];
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