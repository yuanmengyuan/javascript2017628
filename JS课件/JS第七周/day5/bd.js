var oWrap=document.getElementById('wrap');
var oInput=oWrap.getElementsByTagName('input')[0];
var oBtn=oWrap.getElementsByTagName('button')[0];
var oUl=oWrap.getElementsByTagName('ul')[0];
var aLi=oUl.getElementsByTagName('li');
var oBody=document.body;
var n=-1;
var oldValue=null;

//当鼠标聚焦input的时候，如果有内容，ul显示，否则隐藏
//当编辑input的内容的时候，如果有内容，ul显示，否则隐藏
//当编辑内容的时候，开始获取数据，并绑定数据；

//点击页面任何地方的时候，ul隐藏；
//点击li列表的时候，input的内容改变，同时search，ul隐藏；
//点击搜索的时候，开始搜索；

//按下 下键／上键的时候，开始背景的切换，同时，input的内容也发生改变；
//按下enter键的时候，开始搜索；
//https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=j自动聚焦

function showUl() {
    var oTxt=this.value.replace(/(^ +| +$)/g,'');
    if(oTxt.length){
        oUl.style.display='block';
    }else{
        oUl.style.display='none';
    }
}
function clickFn(e) {
    var target=e.target;
    if(target.tagName.toLowerCase()==='input'){
        return;
    }
    if(target.tagName.toLowerCase()==='button'){
        search();
        return;
    }
    if(target.tagName.toLowerCase()==='a' && target.parentNode.tagName.toLowerCase()==='li'){
        oInput.value=target.innerText;
        search();
    }
    oUl.style.display='none';
}
function bindData(data) {
    var str='';
    if(data.length){
        for(var i=0; i<data.length; i++){
            str+='<li><a href="javascript:;">'+data[i]+'</a></li>'
        }
        oUl.innerHTML=str;
    }
    for(var i=0; i<aLi.length; i++){
        on(aLi[i],'mouseover',mouseover);
    }
}
function getData() {
    var oTxt=this.value.replace(/(^ +| +$)/g,'');
    ajax({
        url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
        data:{"wd":oTxt},
        type:'jsonp',
        jsonp:'cb',
        success:function (val) {
            var data=val.s;
            bindData(data);
        }
    })
}
function keyDown(e) {
    switch (e.keyCode){
        case 38://上键
            n--;
            if(n<=-2){
                n=aLi.length-1;
            }
            e.preventDefault();
            changeBg.call(this);
            break;
        case 40://下键
            n++;
            if(n>=aLi.length){
                n=-1;
            }
            changeBg.call(this);
            break;
        case 13://enter
            search();
            break;
    }
}
function search() {
    window.open('https://www.baidu.com/s?wd='+oInput.value,'_self');
    oUl.style.display='none';
    oInput.value='';
}
function changeBg() {
    if(!oldValue){
        oldValue=this.value;
    }
    off(oInput,'keyup',getData);
    for(var i=0; i<aLi.length; i++){
        aLi[i].className=null;
    }
    if(n===-1){
        //单独处理
        this.value=oldValue;
    }else{
        aLi[n].className='on';
        this.value=aLi[n].innerText;
    }
}
function mouseover() {
    for(var i=0; i<aLi.length; i++){
        aLi[i].className='';
        aLi[i].index=i;
    }
    this.className='on';
    n=this.index;
}


oInput.focus(); //自动聚焦
//当鼠标聚焦input的时候，如果有内容，ul显示，否则隐藏
//当编辑input的内容的时候，如果有内容，ul显示，否则隐藏
on(oInput,'keyup',showUl);
on(oInput,'focus',showUl);
//当编辑内容的时候，开始获取数据，并绑定数据
on(oInput,'keyup',getData);
//键盘事件
on(oInput,'keydown',keyDown)
//点击事件进行事件委托；
on(oBody,'click',clickFn);
//给所有的li添加鼠标移入事件
