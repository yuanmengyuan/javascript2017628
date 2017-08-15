//要保证所有的this指向实例；
function Tab(el) {
    if(!el) return;
    this.boxInner=el.getElementsByTagName('div')[0];
    this.aImg=el.getElementsByTagName('img');
    this.aLi=el.getElementsByTagName('li');
    this.timer=null;
    this.n=0;
    this.init();
}
//全局函数都作为公有方法；
Tab.prototype={
    init:function () {
        var _this=this;
        //写的就是思路
        this.addImg();
        //图片自动轮播
        clearInterval(this.timer);
        this.timer=setInterval(function () {
            _this.move()
        },2000)
        //焦点自动轮播
        //鼠标移入停止，移出继续
        //点击焦点手动切换
        //点击左右按钮手动切换
    },
    addImg:function () {
        this.boxInner.innerHTML+='<img src="img/banner1.jpg" alt="">';
        this.boxInner.style.width=this.aImg[0].offsetWidth*this.aImg.length+'px';
    },
    move:function () {
        if(this.n>=this.aImg.length-1){
            this.n=0;
            util.css(this.boxInner,{left:0})
        }
        this.n++;
        animate({
            el:this.boxInner,
            target:{
                left:-this.n*1000
            }
        })
    }
}