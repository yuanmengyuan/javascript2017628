//在移入的时候，让"left"这个元素，背景变成黄色，文字变成红色；
//在移出的时候，让"left"这个元素，背景变成红色，文字变成白色；
var oLeft=document.getElementById('left'); //1：拿到left这个元素
// 在document文档下，得到元素通过ID  left
oLeft.onmouseover=function () {
    oLeft.style.background='yellow';
    oLeft.style.color='red';
    oLeft.style.fontSize='50px';
};
oLeft.onmouseout=function () {
    oLeft.style.background='red';
    oLeft.style.color='#fff';
    oLeft.style.fontSize='30px';
};
/*
function change(bg,color,num) {//函数function就是用来做事情的
    oLeft.style.background=bg;
    oLeft.style.color=color;
    oLeft.style.fontSize=num;
}
 oLeft.onmouseover=function () {
    change('yellow','red','50px')
 };
 //在移出的时候，让"left"这个元素，背景变成红色，文字变成白色；
 oLeft.onmouseout=function () {
    change('red','white','30px')
 };
*/