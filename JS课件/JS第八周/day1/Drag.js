function EventEmitter() {}
EventEmitter.prototype={
    constructor:EventEmitter,
    on:function (type,fn) {
        if(!this['my'+type]){
            this['my'+type]=[];
        }
        var a=this['my'+type];
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);
        return this;
    },
    fire:function (type,e) {//本质：拿到自定义行为上绑定的数组，进行顺序调用
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
    },
    off:function (type,fn) {//本质：拿到数组，把匹配到的赋值为null;
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
}
function Drag(opt) {
    if(!opt.el) return;
    this.el=opt.el;
    this.x=this.y=this.l=this.t=null;
    this.MOVE=this.UP=null;
    this.init();
}
Drag.prototype=new EventEmitter();
Drag.prototype.constructor=Drag;
Drag.prototype.init=function () {
    on(this.el,'mousedown',processThis(this.down,this))
};
//存储最初的坐标和位置
Drag.prototype.down=function (e) {
    this.x=e.clientX;
    this.y=e.clientY;
    this.l=this.el.offsetLeft;
    this.t=this.el.offsetTop;
    this.MOVE=processThis(this.move,this);
    this.UP=processThis(this.up,this);
    //判断浏览器
    if(this.el.setCapture){
        this.el.setCapture();
        on(this.el,'mousemove',this.MOVE)
        on(this.el,'mouseup',this.UP)
    }else{
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
        e.preventDefault();
    }
    this.fire('myDown',e)
};
Drag.prototype.move=function (e) {
    this.el.style.left=e.clientX-this.x+this.l+'px';
    this.el.style.top=e.clientY-this.y+this.t+'px';
    this.fire('myMove',e)
};
Drag.prototype.up=function (e) {
    if(this.el.releaseCapture){
        this.el.releaseCapture();
        off(this.el,'mousemove',this.MOVE)
        off(this.el,'mouseup',this.UP)
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
    this.fire('myUp',e);
}