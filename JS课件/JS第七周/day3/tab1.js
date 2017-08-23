var oWrap=document.getElementById('wrap');
var disX,disY;
oWrap.onmousedown=down;
//鼠标按下
function down(e) {
    e=e||window.event;
    disX=e.clientX-this.offsetLeft;
    disY=e.clientY-this.offsetTop;
    if(oWrap.setCapture){//IE浏览器
        oWrap.setCapture() //焦点捕获
        oWrap.onmousemove=move;
        oWrap.onmouseup=up;
    }else{//标准浏览器
        document.onmousemove=move;
        document.onmouseup=up;
    }
}
//鼠标移动
function move(e) {
    e=e||window.event;
    //设置wrap的位置
    oWrap.style.left=e.clientX-disX+'px';
    oWrap.style.top=e.clientY-disY+'px';
    if(e.preventDefault) e.preventDefault();
}
//鼠标抬起
function up() {
    //判断浏览器
    if(this.releaseCapture){
        this.releaseCapture();//释放焦点
    }
    this.onmousemove=null;
    this.onmouseup=null;
}