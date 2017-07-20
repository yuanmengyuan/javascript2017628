function Tab(obj) {
    this.el=obj.el;
    //构造函数中，存放的都是私有的属性和方法
    //把全局变量，都作为私有属性
    this.oWrap=document.getElementById(this.el);
    this.aLi=this.oWrap.getElementsByTagName('li');
    this.aDiv=this.oWrap.getElementsByTagName('div');
    this.init();
}
//全局函数，都作为公有方法-prototype
//保证所有的this，都指向实例；
//把所有的方法，都放在原型上；
Tab.prototype.init=function () {
    //用变量保存了正确的this；
    var _this=this;
    for(var i=0; i<this.aLi.length; i++){
        this.aLi[i].index=i;
        this.aLi[i].onclick=function () {
            _this.clickFn(this);
        };//xxff00
    }
};
Tab.prototype.clickFn=function (curLi) {
    //这里面的this现在实例；
    for(var i=0; i<this.aLi.length; i++){
        this.aLi[i].className=null;
        this.aDiv[i].className=null;
    }
    this.aLi[curLi.index].className='on';
    this.aDiv[curLi.index].className='show';
}