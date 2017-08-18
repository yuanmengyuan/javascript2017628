function Tab(el) {
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
//原型上放的，都是公有的属性和方法
Tab.prototype={
    constructor:Tab,
    init:function () {//核心思路
        var _this=this;
        //init中写当前组建的思路；
        //1：获取数据
        this.getData();
        //2:绑定数据
        this.bindData();
        //3:图片懒加载；
        this.showImg();
        //4:图片自动轮播
        clearInterval(this.timer);
        this.timer=setInterval(function () {
            _this.move();
        },2000);
        //6:鼠标移入停止，移出继续
        this.overout();
        //7:点击焦点手动切换
        this.handleChange();
        //8：点击左右按钮进行切换
        this.leftRight();
    },
    //获取数据
    getData:function () {
        //先保存正确的this；
        var _this=this;
        $.ajax({
            url:'./data.txt',
            type:'GET',
            async:false,
            dataType:'json',
            success:function (val) {
                _this.data=val;
            }
        })
    },
    //绑定数据的
    bindData:function () {
        var strImg='',strLi='';
        for(var i=0; i<this.data.length; i++){
            var cur=this.data[i];
            strImg+='<img src="#" data-realImg="'+(cur.imgSrc)+'">';
            strLi+= i===0?'<li class="on"></li>':'<li></li>';
        }
        strImg+='<img src="#" data-realImg="img/banner1.jpg">'
        this.$boxInner.html(strImg).next().html(strLi);
        this.$aImg=this.el.find('img');
        this.$aLi=this.el.find('li');
        this.$boxInner.css('width',this.$aImg.first().width()*this.$aImg.length);
    },
    //显示图片和图片懒加载
    showImg:function () {
        for(var i=0; i<this.$aImg.length; i++){
            var img=this.$aImg.eq(i);
            //把每张图片都进行懒加载的设置；
            this.lazyImg(img)
        }
    },
    lazyImg:function (img) {
        //1:创建一个临时的图片对象
        var tmpImg=$('<img/>');
        //2：给临时对象添加正确的图片的地址
        tmpImg.attr('src',img.data('realimg'));
        //3:验证地址的正确性
        tmpImg.on('load',function () {
            img.attr('src',$(this).attr('src'));
            tmpImg=null;
        });
        tmpImg.on('error',function () {
            img.attr('src','img/error.gif');
            tmpImg=null;
        });
    },
    //图片自动轮播
    move:function () {
        if(this.n>=this.$aImg.length-1){
            this.n=0;
            this.$boxInner.css('left',this.n*1000)
        }
        this.n++;
        this.setBanner();
    },
    //图片和焦点一起动
    setBanner:function () {
        this.$boxInner.animate({
            'left':-this.n*1000
        });
        //5:焦点自动切换
        this.bannerTip();
    },
    bannerTip:function () {
        var _this=this;
        this.$aLi.each(function (index,item) {
            if(index===_this.n%_this.$aLi.length)
                _this.$aLi.eq(index).addClass('on').siblings('li').removeClass('on');
        })
    },
    //移入停止，移出继续
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
    //手动点击焦点，进行图片替换
    handleChange:function () {
        var _this=this;
        this.$aLi.click(function () {
            _this.n=$(this).index();
            _this.setBanner();
        })
    },
    //点击左右按钮进行替换
    leftRight:function () {
        var _this=this;
        this.$right.on('click',function () {
            _this.move();
        }).prev().on('click',function () {
            if(_this.n<=0){
                _this.n=_this.$aLi.length;
                _this.$boxInner.css('left',-_this.n*1000);
            }
            _this.n--;
            _this.setBanner();
        })
    }

};









