class EventEmitter{
    //构造函数中的私有属性，都写在constructor中
    constructor(){}
    //绑定自定义行为的
    //原型prototype上的方法，都写在下面
    on(type,fn){
        if(!this['my'+type]){
            this['my'+type]=[];
        }
        let a=this['my'+type];
        for(let i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);
        return this;
    }
    //拿到数组，进行顺序调用
    fire(type,e){
        let a=this['my'+type]||[];
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
        return this;
    }
    //拿到数组，顺序遍历并把匹配到的赋值为null
    off(type,fn){
        let a=this['my'+type]||[];
        if(a.length){
            for(var i=0; i<a.length; i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;
                }
            }
        }
        return this;
    }
}
class Drag extends EventEmitter{
    constructor(opt){
        super();
        if(!opt.el) return;
        this.el=opt.el;
        this.x=this.y=this.l=this.t=null;
        this.MOVE=this.UP=null;
        this.init();
    }
    init(){
        //on方法中绑定的是系统行为，this.on绑定的是自定义行为；
        on(this.el,'mousedown',(e)=>{
            this.down(e);
        });
    }
    down(e){
        this.x=e.clientX;
        this.y=e.clientY;
        this.l=this.el.offsetLeft;
        this.t=this.el.offsetTop;
        this.MOVE=(e)=>{
            this.move(e)
        };
        this.UP=(e)=>{
            this.up(e)
        };
        //判断浏览器，分别进行move和up的事件绑定
        if(this.el.setCapture){
            this.el.setCapture();
            on(this.el,'mousemove',this.MOVE);
            on(this.el,'mouseup',this.UP);
        }else{
            on(document,'mousemove',this.MOVE);
            on(document,'mouseup',this.UP);
            e.preventDefault();
        }
        //暴露接口
        this.fire('myDown',e)
    }
    move(e){
        this.el.style.left=e.clientX-this.x+this.l+'px';
        this.el.style.top=e.clientY-this.y+this.t+'px';
        //暴露接口
        this.fire('myMove',e)
    }
    up(e){
        if(this.el.releaseCapture){
            this.el.releaseCapture();
            off(this.el,'mousemove',this.MOVE);
            off(this.el,'mouseup',this.UP);
        }else{
            off(document,'mousemove',this.MOVE);
            off(document,'mouseup',this.UP);
        }
        //暴露接口
        this.fire('myUp',e);
    }

}
Drag.zIndex=0;
Drag.prototype.creaseIndex=function () {
    this.on('myDown',()=>{
        this.el.style.zIndex=++Drag.zIndex;
    })
};

Drag.prototype.limit=function (opt) {
    this.opt=opt;
    this.on('myMove',()=>{
        var l=this.el.offsetLeft;
        var t=this.el.offsetTop;
        if(l<this.opt.l){
            l=this.opt.l;
        }else if(l>this.opt.r){
            l=this.opt.r
        }
        if(t<this.opt.t){
            t=this.opt.t
        }else if(t>this.opt.b){
            t=this.opt.b
        }
        this.el.style.left=l+'px';
        this.el.style.top=t+'px';
    })
};
Drag.prototype.jump=function () {
    this.on('myDown',this.clearTimer).on('myMove',this.getSpeed).on('myUp',this.flyX).on('myUp',this.flyY)
};
//求横向速度；
Drag.prototype.clearTimer=function () {
    clearTimeout(this.timerX);
    clearTimeout(this.timerY);
};
Drag.prototype.getSpeed=function (e) {
    if(!this.prevX){
        this.prevX=e.clientX;
    }else{
        this.speedX=e.clientX-this.prevX;
        this.prevX=e.clientX;
    }
};
Drag.prototype.flyX=function (e) {
    clearTimeout(this.timerX);
    this.speedX*=.93;
    var l=this.el.offsetLeft+this.speedX;
    var maxL=(document.documentElement.clientWidth||document.body.clientWidth)-this.el.offsetWidth;
    if(l<0){
        l=0;
        this.speedX*=-1;
    }else if(l>maxL){
        l=maxL;
        this.speedX*=-1;
    }
    if(Math.abs(this.speedX)>=0.5){
        this.el.style.left=l+'px';
        this.timerX=setTimeout(processThis(arguments.callee,this),10)
    }
};
Drag.prototype.flyY=function (e) {
    clearTimeout(this.timerY)
    //求纵向的速度
    if(!this.speedY){
        this.speedY=9.8;
    }else{
        this.speedY+=9.8;
    }
    this.speedY*=.93;
    var t=this.el.offsetTop+this.speedY;
    var maxT=(document.documentElement.clientHeight||document.body.clientHeight)-this.el.offsetHeight;
    if(t>maxT){
        t=maxT;
        this.speedY*=-1;
        ++this.flg;
    }else{
        this.flg=0;
    }
    if(this.flg<2){
        this.el.style.top=t+'px';
        this.timerY=setTimeout(processThis(arguments.callee,this),10);
    }
};
Drag.prototype.dashed=function (e) {
    this.on('myDown',this.createDashed).on('myUp',this.renew)
};
//按下的时候出虚线框
Drag.prototype.createDashed=function () {
    this.el.style.backgroundColor='transparent';
    this.el.style.border='4px dashed #f00';
};
Drag.prototype.renew=function () {
    this.el.style.backgroundColor='#ccc';
    this.el.style.border='none';
};
Drag.prototype.album=function (aLi) {
    this.aLi=aLi;
    this.creaseIndex();
    this.on('myMove',this.kicked).on('myUp',this.changePos)
};
Drag.prototype.goHome=function () {
    animate({
        el:this.el,
        target:{
            left:this.el.l,
            top:this.el.t
        },
        effect:3,
        duration:500
    })
};
Drag.prototype.isKicked=function (l,r) {
    if(l.offsetLeft+l.offsetWidth<r.offsetLeft || l.offsetTop+l.offsetHeight<r.offsetTop || l.offsetLeft>r.offsetLeft+r.offsetWidth || l.offsetTop>r.offsetTop+r.offsetHeight){
        return false;
    }else{
        return true;
    }
};
Drag.prototype.kicked=function () {
    this.arr=[];
    //跟循环有关的只有两个:continue break;
    for(var i=0; i<this.aLi.length; i++){
        var cur=this.aLi[i]||[];
        if(this.el===cur) continue;
        if(this.isKicked(this.el,cur)){
            this.arr.push(cur);
            cur.style.background='red';
        }else{
            cur.style.background='lightBlue';
        }
    }
};
Drag.prototype.changePos=function () {
    this.arr=this.arr||[];
    if(this.arr.length){
        for(var i=0; i<this.arr.length; i++){
            var cur=this.arr[i];
            cur.dis=Math.sqrt(Math.pow(this.el.offsetLeft-cur.offsetLeft,2)+Math.pow(this.el.offsetTop-cur.offsetTop,2))
        }
        for(var i=0; i<this.aLi.length; i++){
            this.aLi[i].style.background='lightBlue';
        }
        //求出距离最短的元素；
        this.arr.sort(function (a,b) {
            return a.dis-b.dis;
        });
        var shortest=this.arr[0];
        shortest.style.background='purple';
        this.el.style.background='purple';
        animate({
            el:this.el,
            target:{
                left:shortest.l,
                top:shortest.t
            },
            effect:3,
            duration:500
        });
        animate({
            el:shortest,
            target:{
                left:this.el.l,
                top:this.el.t
            },
            effect:3,
            duration:500
        })
        var tmp={};
        tmp.l=this.el.l,tmp.t=this.el.t;
        this.el.l=shortest.l,this.el.t=shortest.t;
        shortest.l=tmp.l,shortest.t=tmp.t;
    }else{
        this.goHome();
    }
    this.arr=[];
};











