function Totop(opt) {
    if(!opt.el) return;
    this.el=opt.el;
    this.duration=opt.duration||700;
    this.interval=30;
    this.timer=null;
    this.tmpFn=null;
    this.init();//init一定是在构造函数中的最后一句话
}
Totop.prototype={
    constructor:Totop,
    init:function () {
        var _this=this;
        //点击按钮的时候，拿到
        // 1）点击时间发生的时候，回去的总距离
        this.el.on('click',function () {
            _this.goHome()
        });
        this.tmpFn=function () {
            _this.computedDisplay();
        };
         //事件绑定
        $(window).on('scroll',this.tmpFn);
    },
    computedDisplay:function () {
        //滚动的距离大于一屏的时候
        if($('body').scrollTop()>$(window).height()){
            this.el.fadeIn();
        }else{
            this.el.fadeOut();
        }
    },
    goHome:function () {
        var _this=this;
        var target=$('body').scrollTop();
        this.el.hide();
        //解除事件绑定
        $(window).off('scroll',this.tmpFn);
        // 2）根据时间求出步长
        var step=target/this.duration*this.interval;
        this.timer=setInterval(function () {
            //获取最新的距离；
            var curT=$('body').scrollTop();
            // 4）判断停止条件
            if(curT<=0){
                clearInterval(_this.timer);
                //事件绑定
                $(window).on('scroll',_this.tmpFn);
                return;//阻断程序的执行；
            }
            // 3）用最新距离-=step步长
            curT-=step;
            $('body').scrollTop(curT);
        },this.interval)
    }
}