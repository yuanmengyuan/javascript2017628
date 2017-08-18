function Opacity(el) {
    if(!el) return;
    //类里面放的都是私有的属性和方法
    //获取需要的元素，把全局变量都作为了私有属性
    this.el=el;
    this.$boxInner=el.children('.boxInner');
    this.$aImg=null;
    this.$aLi=null;
    this.$left=el.find('.left');
    this.$right=el.find('.right');
    this.$ul=el.children('ul');
    this.data=null;
    this.n=0;
    this.timer=null;
    this.init();
}
Opacity.prototype={
    constructor:Opacity,
    init:function () {
        var _this=this;
        //1:获取数据
        this.getData();
        //2:绑定数据
        this.bindData();
        //3:图片懒加载
        this.showImg();
        //4:图片自动渐隐渐现
        clearInterval(this.timer);
        this.timer=setInterval(function () {
            _this.move();
        },2000)
        //6:鼠标移入停止，移出继续
        this.overout();
        //7:点击焦点手动切换
        this.handleChange();
        //8:点击左右按钮，进行切换
        this.leftRight()

    },
    getData:function () {
        var _this=this;
        $.ajax({
            url:'data.txt',
            type:'Get',
            async:false,
            dataType:'json',
            success:function (val) {
                _this.data=val;
            }
        })
    },
    bindData:function () {
        var strImg='',strLi='';
        $.each(this.data,function (index,item) {
            strImg+='<img src="" data-realImg="'+(item.imgSrc)+'">';
            strLi+=index==0?'<li class="on"></li>':'<li></li>';
        });
        this.$boxInner.html(strImg).next().html(strLi);
        this.$aLi=this.el.find('li');
        this.$aImg=this.el.find('img');
    },
    showImg:function () {
        var _this=this;
        $.each(this.$aImg,function (index,item) {
            //原生转jquery    $();
            //jquery转js   get(index)  [index]
            _this.lazyImg($(item))
        })
    },
    lazyImg:function (img) {
        var _this=this;
        var tmpImg=$('<img/>');
        tmpImg.attr('src',img.data('realimg'));
        tmpImg.on('load',function () {
            img.attr('src',$(this).attr('src'));
            tmpImg=null;
            /*_this.$aImg.first().css('zIndex',1).animate({
                opacity:1
            })*/
            _this.$aImg.first().css('zIndex',1).fadeIn(1000);
        })
    },
    move:function () {
        this.n++;
        this.n%=this.$aImg.length;
        this.setBanner();
    },
    setBanner:function () {
        var _this=this;
        $.each(this.$aImg,function (index,item) {
            if(index===_this.n){
                $(item).css('zIndex',1).fadeIn(1000,function () {
                    $(this).siblings('img').fadeOut(500);

                }).siblings().css('zIndex',0)
            }
        });
        //5:焦点自动轮播
        this.bannerTip();
    },
    bannerTip:function () {
        var _this=this;
        this.$aLi.each(function (index,item) {
            if(index==_this.n)
                $(item).addClass('on').siblings().removeClass('on');
        })
    },
    overout:function () {
        var _this=this;
        this.el.on('mouseover',function () {
            clearInterval(_this.timer);
            _this.$left.show().next().show();
        }).on('mouseout',function () {
            _this.timer=setInterval(function () {
                _this.move();
            },2000);
            _this.$left.hide().next().hide();
        })
    },
    handleChange:function () {
        var _this=this;
        this.$aLi.on('click',function () {
            _this.n=$(this).index();
            _this.setBanner();
        })
    },
    leftRight:function () {
        var _this=this;
        this.$right.on('click',function () {
            _this.move();
        }).prev().on('click',function () {
            if(_this.n<=0){
                _this.n=_this.$aLi.length
            }
            _this.n--;
            _this.setBanner();
        })
    }
};















