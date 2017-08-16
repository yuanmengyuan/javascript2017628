var oWrap=document.getElementById('wrap');
var oBoxInner=oWrap.getElementsByTagName('div')[0];
var aImg=oWrap.getElementsByTagName('img');
var aLi=oWrap.getElementsByTagName('li');
var oLeft=oWrap.getElementsByTagName('a')[0];
var oRight=oWrap.getElementsByTagName('a')[1];
var timer;
var n=0;

//1：图片自动间隐渐现；
//先处理第一张图片的渐现效果
util.css(aImg[0],'zIndex',1);
animate({
    el:aImg[0],
    target:{
        opacity:1
    }
});
clearInterval(timer);
timer=setInterval(move,2000);
function move() {
    n++;
    n=n%aImg.length;
    //让第几张图片显示，条件是图片的索引==n;
    setBanner()
}
function setBanner() {
    for(var i=0; i<aImg.length; i++){
        if(i==n){
            util.css(aImg[i],{
                'zIndex':1
            });
            animate({
                el:aImg[i],
                target:{
                    'opacity':1
                },
                cb:function () {
                    //当运动结束的时候，让当前显示的图片的"其他兄弟元素"，透明度都变成0;
                    var siblings=util.siblings(this);
                    for(var i=0; i<siblings.length; i++){
                        util.css(siblings[i],'opacity',0)
                    }
                }
            })
        }else{
            util.css(aImg[i],{
                'zIndex':0
            });
        }
    }
    bannerTip();
}
//焦点自动轮播
function bannerTip() {
    //哪个焦点的索引等于n的时候，就把谁点亮
    for(var i=0; i<aLi.length; i++){
        aLi[i].className=i===n?'on':null;
    }
}
//鼠标移入停止，移出继续
overout();
function overout() {
    oWrap.onmouseover=function () {
        oLeft.style.display=oRight.style.display='block';
        clearInterval(timer);
    };
    oWrap.onmouseout=function () {
        oLeft.style.display=oRight.style.display='none';
        timer=setInterval(move,2000);
    }
}
//点击焦点手动切换
handleChange();
function handleChange() {
    for(var i=0; i<aLi.length; i++){
        aLi[i].index=i;
        aLi[i].onclick=function () {
            n=this.index;
            setBanner()
        }
    }
}
//点击左右按钮手动切换
leftright()
function leftright() {
    oRight.onclick=move;
    oLeft.onclick=function () {
        if(n<=0){
            n=aLi.length;//4
        }
        n--;
        setBanner();
    }
}
//当前页面聚焦的时候，开启定时器；
window.onfocus=function () {
    timer=setInterval(move,2000);
};
//当页面失去焦点的时候，关闭定时器
window.onblur=function () {
    clearInterval(timer);//关闭电石气
};