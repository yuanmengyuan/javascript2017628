//1:获取元素 2：获取数据 3：绑定数据 4：隔行换色 5：表格排序
var oTab=document.getElementById('tab');
var thead=oTab.tHead;
var cells=thead.rows[0].cells;
var tbody=oTab.tBodies[0];
var rows=tbody.rows;
var data;
//2：获取数据
function getData() {
    //1:创建xml对象
    var xml=new XMLHttpRequest();
    //2:打开地址
    xml.open('GET','data1.txt',false);
    //3:响应请求
    xml.onreadystatechange=function () {
        if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
            data=utils.jsonParse(xml.responseText);
        }
    }
    //4:发送请求
    xml.send();
}
getData();
//3：绑定数据
function bind() {
    var frg=document.createDocumentFragment();
    for(var i=0; i<data.length; i++){
        //有多少组数据，创建多少个tr，每个数据中有多少键值对，就创建多少td，td需要插入tr;
        var cur=data[i];
        var oTr=document.createElement('tr');
        for(var attr in cur){
            var oTd=document.createElement('td');
            if(attr==='sex'){
                cur[attr]=cur[attr]===0?'男':'女';
            }
            oTd.innerHTML=cur[attr];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tbody.appendChild(frg);
    frg=null;
}
bind()
//4：隔行换色
function changebg() {
   for(var i=0; i<rows.length; i++){
       rows[i].className='bg'+i%3;
       rows[i].oldbg='bg'+i%3;
       rows[i].onmouseover=function () {
           this.className='changebg';
       };
       rows[i].onmouseout=function () {
           this.className=this.oldbg;
       };
   }
}
changebg();
//5：表格排序
function sort(n) {
    for(var i=0; i<cells.length; i++){
        if(i===n){
            cells[i].flg*=-1;
        }else{
            cells[i].flg=-1;
        }
    }
    //1:类数组转数组
    var ary=utils.makeArray(rows);
    //2:sort排序
    ary.sort(function (a,b) {
        a=a.cells[n].innerHTML;
        b=b.cells[n].innerHTML;
        if(isNaN(a) || isNaN(b)){
            return (a.localeCompare(b))*cells[n].flg;
        }
        return (a-b)*cells[n].flg;
    });
    //3:重新插入页面
    var frg=document.createDocumentFragment();
    for(var i=0; i<ary.length; i++){
        frg.appendChild(ary[i]);
    }
    tbody.appendChild(frg);
    frg=null;
    changebg();
}
for(var i=0; i<cells.length; i++){
    if(cells[i].className==='cursor'){
        (function (index) {
            cells[i].flg=-1;
            cells[i].onclick=function () {
                sort(index)
            }
        })(i);
    }
}
