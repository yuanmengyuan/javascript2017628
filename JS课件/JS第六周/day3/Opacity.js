function Opacity(el) {
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
Opacity.prototype={
    constructor:Opacity,
    init:function () {
        var _this=this;
        //核心思路
        //处理第一张图的渐现效果
        util.css(this.aImg[0],'zIndex',1);
        animate({
            el:this.aImg[0],
            target:{
                opacity:1
            }
        });
        //1:让图片自动间隐渐现
        clearInterval(this.timer);
        this.timer=setInterval(function () {
            _this.move()
        },2000)
        //2:让焦点自动间隐渐现
        //3:移入停止，移出继续
        //4:点击焦点手动切换
        //5:点击左右按钮进行切换

    },
    move:function () {
        this.n++;
        this.n%=this.aImg.length;
        this.setBanner();
    },
    setBanner:function () {
        for(var i=0; i<this.aImg.length; i++){
            if(i===this.n){
                //让当前图片层级提高
                util.css(this.aImg[i],'zIndex',1);
                animate({
                    el:this.aImg[i],
                    target:{
                        opacity:1
                    },
                    cb:function () {
                        var siblings=util.siblings(this);
                        for(var i=0; i<siblings.length; i++){
                            util.css(siblings[i],'opacity',0)
                        }
                    }
                })
            }else{
                //其他图片层级为0
                util.css(this.aImg[i],'zIndex',0)
            }
        }
    }
};












