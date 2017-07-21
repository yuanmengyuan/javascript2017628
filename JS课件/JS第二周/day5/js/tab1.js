//类
function Tab(opt) {
    if(!opt.el) return; //阻断程序执行的作用；
    this.el=opt.el;
    //构造函数中的this，就是实例；
    this.oWrap=document.getElementById(this.el);
    this.aBtn=this.oWrap.getElementsByTagName('li');
    this.aDiv=this.oWrap.getElementsByTagName('div');
    this.init();
}
//原型
/*
Tab.prototype.init=function () {
    //这里的this都是实例
    var _this=this;
    //init中写该UI效果的核心思路；
    for(var i=0; i<this.aBtn.length; i++){
        (function (index) {
            //这里的this是window
            _this.aBtn[i].onclick=function () {
                _this.clickFn(index);
            }
        })(i);
    }

};
Tab.prototype.clickFn=function (index) {
    for(var i=0; i<this.aBtn.length; i++){
        this.aBtn[i].className='';
        this.aDiv[i].className=''
    }
    this.aBtn[index].className='on';
    this.aDiv[index].className='show';
}*/
Tab.prototype={
    constructor:Tab,
    init:function () {
        //这里的this都是实例
        var _this=this;
        //init中写该UI效果的核心思路；
        for(var i=0; i<this.aBtn.length; i++){
            (function (index) {
                //这里的this是window
                _this.aBtn[i].onclick=function () {
                    _this.clickFn(index);
                }
            })(i);
        }

    },
    clickFn:function (index) {
        for(var i=0; i<this.aBtn.length; i++){
            this.aBtn[i].className='';
            this.aDiv[i].className=''
        }
        this.aBtn[index].className='on';
        this.aDiv[index].className='show';
    }
};
