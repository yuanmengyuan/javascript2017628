//面向对象中，所有的this都指向实例；
function Drag(opt) {
    this.el=opt.el;
    if(!this.el) return;
    this.DOWN=processThis(this.down,this);
    this.MOVE=processThis(this.move,this);
    this.UP=processThis(this.up,this);
    this.init();
}
Drag.prototype={
    constructor:Drag,
    init:function () {
        on(this.el,'mousedown',this.DOWN)
    },
    down:function (e) {
        //保存鼠标坐标和元素的位置
        this.x=e.clientX;
        this.y=e.clientY;
        this.l=this.el.offsetLeft;
        this.t=this.el.offsetTop;
        //区分浏览器
        if(this.el.setCapture){//IE
            this.el.setCapture();
            on(this.el,'mousemove',this.MOVE);
            on(this.el,'mouseup',this.UP);
        }else{//标准浏览器
            on(document,'mousemove',this.MOVE);
            on(document,'mouseup',this.UP);
            e.preventDefault();
        }
    },
    move:function (e) {
        this.el.style.left=e.clientX-this.x+this.l+'px';
        this.el.style.top=e.clientY-this.y+this.t+'px';
    },
    up:function () {
        if(this.el.releaseCapture){
            this.el.releaseCapture();
            off(this.el,'mousemove',this.MOVE);
            off(this.el,'mouseup',this.UP);
        }else{
            off(document,'mousemove',this.MOVE);
            off(document,'mouseup',this.UP);
        }
    }
};












