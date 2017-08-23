//绑定事件
//el：谁  type：添加什么行为   fn:做什么事
function on(el,type,fn){
    //进行浏览器的判断
    if('addEventListener' in el){//标准浏览器
        el.addEventListener(type,fn,false);
    }else{//IE
        //目的：把要绑定的方法fn，都放到自定义事件池
        //没有数组的时候，创建一个数组
        if(!el['event'+type]){
            //这里面的代码，只会走一次；
            el['event'+type]=[];
            //解除attachEvent重复绑定的问题；
            el.attachEvent('on'+type,function(){
                run.call(el)
            })
        }
        var a=el['event'+type];
        //解决：自定义事件池中的方法不重复的问题；
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;//阻断程序执行的作用
        }
        a.push(fn);//把要绑定的方法，放到自定义事件池
       // el.attachEvent('on'+type,tmpFn);//把要绑定的方法，放到系统事件池；

    }
}
//目的：就是拿到自定义事件池中所有绑定的方法，进行循环调用；
function run() {
    var e=window.event;
    var arr= this['event'+e.type];
    if(arr.length){
        for(var i=0; i<arr.length; i++){
            if(typeof arr[i]==='function'){
                arr[i].call(this);//每个绑定的方法在执行的时候，this都指向el
            }else{
               arr.splice(i,1);
               i--;
            }
        }
    }

}
//解除绑定
function off(el,type,fn) {
    if('removeEventListener' in el){//标准浏览器
        el.removeEventListener(type,fn,false);
    }else{
        var arr=el['event'+type];//自定义事件池中，绑定的方法
        if(arr.length){
            for(var i=0; i<arr.length; i++){
                if(arr[i]===fn){
                    arr[i]=null;
                    break; //打断循环
                }
            }
        }
    }
}
