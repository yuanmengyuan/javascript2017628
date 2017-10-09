function on(el,type,fn) {
    //先判断自定义行为和系统行为；
    if(/^my/.test(type)){//自定义行为：本质把所有方法，都绑定数组上了；
        if(!el[type]){
            el[type]=[];
        }
        let a=el[type];
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);
    }else{//系统行为:浏览器支持和不支持IE
        if(el.addEventListener){
            el.addEventListener(type,fn,false);//冒泡；
        }else{//IE ：把事件都绑到数组上；只给系统池绑一个run方法；
            if(!el['on'+type]){
                el['on'+type]=[];
                //attachEvent有三个问题：1）顺序 2）重复绑定问题 3）this问题
                el.attachEvent('on'+type,function(){
                    run.call(el);
                })
            }
            let a=el['on'+type];
            for(var i=0; i<a.length; i++){
                if(a[i]===fn) return;
            }
            a.push(fn);

        }

    }
}
//拿到数组，进行顺序调用；
function run(){
    e=window.event;
    let a=this['on'+e.type]||[];
    if(a.length){
        for(var i=0; i<a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(this);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
//拿到数组，进行顺序调用；保证fire中的this指向el;
function fire(type,e) {
    let a=this[type]||[];
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
//拿到数组，把匹配的赋值为null;
function off(el,type,fn) {
    if(/^my/.test(type)){//自定义行为；
        let a=el[type];
        if(a.length){
            for(var i=0; i<a.length; i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }else{//区分浏览器支持和不支持；
        if(el.removeEventListener){
            el.removeEventListener(type,fn,false);
        }else{
            let a=el['on'+type];
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
}