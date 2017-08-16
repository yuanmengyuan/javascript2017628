function Tab(el) {
    //获取当前容器下所有的元素
    this.el=el;
    this.boxInner=el.getElementsByTagName('div')[0];
    this.aImg=el.getElementsByTagName('img');
    this.aLi=el.getElementsByTagName('li');
    this.oLeft=el.getElementsByTagName('a')[0];
    this.oRight=el.getElementsByTagName('a')[1];
    this.n=0;
    this.timer=null;

    this.init();
}
Tab.prototype={
    constructor:Tab,
    init:function () {
        var _this=this;
        //给后面增加一项
        this.setBoxInner();
        //图片自动轮播图
        this.timer=setInterval(function () {
            _this.move();
        },2000);
        //移入停止，移出继续
        this.overout();
        //点击焦点手动切换
        this.handleChange();
        //点击左右按钮进行切换
        this.leftRight();

        window.onfocus=function () {
            _this.timer=setInterval(function () {
                _this.move();
            },2000);
        }
        window.onblur=function () {
            clearInterval(_this.timer);
        }
    },
    setBoxInner:function () {
        this.boxInner.innerHTML+='<img src="img/banner1.jpg" alt="">';
        this.boxInner.style.width=this.aImg[0].offsetWidth*this.aImg.length+'px';
    },
    move:function () {
        if(this.n>=this.aImg.length-1){
            this.n=0;
            util.css(this.boxInner,'left',-this.n*1000)
        }
        this.n++;
        animate({
            el:this.boxInner,
            target:{
                left:-this.n*1000
            }
        })
        this.bannerTip();
    },
    bannerTip:function () {
        for(var i=0; i<this.aLi.length; i++){
            this.aLi[i].className=i===this.n%this.aLi.length?'on':null;
        }
    },
    overout:function () {
        var _this=this;
        this.el.onmouseover=function () {
            _this.oLeft.style.display=_this.oRight.style.display='block';
            clearInterval(_this.timer)
        };
        this.el.onmouseout=function () {
            _this.oLeft.style.display=_this.oRight.style.display='none';
            _this.timer=setInterval(function () {
                _this.move();
            },2000);
        };
    },
    handleChange:function () {
        var _this=this;
        for(var i=0; i<this.aLi.length; i++){
            this.aLi[i].index=i;
            this.aLi[i].onclick=function () {
                _this.n=this.index;
                animate({
                    el:_this.boxInner,
                    target:{
                        left:-_this.n*1000
                    }
                });
                _this.bannerTip();
            }
        }
    },
    leftRight:function () {
        var _this=this;
        this.oLeft.onclick=function () {
            if(_this.n<=0){
                _this.n=_this.aLi.length;
                util.css(_this.boxInner,'left',-_this.n*1000);
            }
            _this.n--;
            animate({
                el:_this.boxInner,
                target:{
                    left:-_this.n*1000
                }
            });
            _this.bannerTip();
        };
        this.oRight.onclick=function () {
            _this.move();
        }
    }
};