(function () {
    var oWrap=document.getElementById('wrap');
    on(oWrap,'mousedown',down);
    function down(e) {
        //记录以前的鼠标坐标和位置
        //this->wrap
        this.x=e.clientX;
        this.y=e.clientY;
        this.l=this.offsetLeft;
        this.t=this.offsetTop;

        //浏览器兼容处理
        if(this.setCapture){//IE
            this.setCapture();
            on(this,'mousemove',move);
            on(this,'mouseup',up);
        }else{//chrome
            var _this=this;
            //改变某个函数中的this；并传事件对象e;
            this.MOVE=function (e) {
                //this->document
                move.call(_this,e);
            };
            this.UP=function (e) {
                //this->document
                up.call(_this,e);
            };
            on(document,'mousemove',this.MOVE);
            on(document,'mouseup',this.UP);
        }
    }
    function move(e) {
        this.style.left=e.clientX-this.x+this.l+'px';
        this.style.top=e.clientY-this.y+this.t+'px';
        if(e.preventDefault) e.preventDefault();
    }
    function up() {
        if(this.releaseCapture){
            this.releaseCapture();
            off(this,'mousemove',move);
            off(this,'mouseup',up);
        }else{
            off(document,'mousemove',this.MOVE);
            off(document,'mouseup',this.UP);
        }
    }
})();