var oWrap=document.getElementById('wrap');
oWrap.onmousedown=down;

function down(e) {
    e=e||window.event;
    //提前保存以前的坐标
    this.x=e.clientX;
    this.y=e.clientY;
    //提前以前的位置；
    this.l=this.offsetLeft;
    this.t=this.offsetTop;
    //move事件应该在down里面被触发
    //判断浏览器
    if(this.setCapture){//IE浏览器
        this.setCapture();
        this.onmousemove=move;
        this.onmouseup=up;
    }else{//标准浏览器
        var _this=this;//用_this保存了wrap；
        document.onmousemove=function () {
            move.call(_this);
        };
        document.onmouseup=function () {
            up.call(_this);
        };
    }
}
function move(e) {
//保证move中的this是wrap；
    e=e||window.event;
    this.style.left=e.clientX-this.x+this.l+'px';
    this.style.top=e.clientY-this.y+this.t+'px';
    e.preventDefault?e.preventDefault():null;
}
function up() {
    if(this.releaseCapture){
        this.releaseCapture();
        this.onmousemove=null;
        this.onmouseup=null;
    }else{
        document.onmousemove=null;
        document.onmouseup=null;
    }
}