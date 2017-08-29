//自定义属性  data-index  data-realImg 和 系统属性 onclick id class...
//自定义事件池 [] 和 系统事件池 attachEvent addEventListener
//自定义行为 myxxxx    和 系统行为 click,mouseover,mouseout....

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
        })
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













