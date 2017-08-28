function EventEmitter() {}
EventEmitter.prototype={
    constructor:EventEmitter,
    on:function(type,fn) {
        //this：实例；
        if(!this['my'+type]){
            this['my'+type]=[];
        }
        var a=this['my'+type];
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);
        return this;//这里是实现链式操作的核心；
    },
//fire里面的this，现在实例；
    fire:function (type,e) {
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
    },
//off:拿到数组,把匹配到的赋值为null
    off:function (type,fn) {
        var a=this['my'+type]||[];
        if(a.length){
            for(var i=0; i<a.length; i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }
};
function Drag(opt) {
    if(!opt.el) return;
    this.x=this.y=this.l=this.t=null;
    this.el=opt.el;
    this.init();
}
//原型链继承
Drag.prototype=new EventEmitter();
Drag.prototype.constructor=Drag;
Drag.prototype.init=function () {
    on(this.el,'mousedown',processThis(this.down,this))
};
Drag.prototype.down=function (e) {
    this.x=e.clientX;
    this.y=e.clientY;
    this.l=this.el.offsetLeft;
    this.t=this.el.offsetTop;
    //console.dir(this)
    this.fire('myDown')
};
