//1:获取元素  2：获取数据 3：绑定数据 4：隔行换色  5：点击排序
//1:获取元素 ：table  tHead aCells tBody aRows
var oTab=document.getElementById('table1')
    ,tHead=oTab.tHead
    ,aCells=tHead.rows[0].cells
    ,tBody=oTab.tBodies[0]
    ,aRows=tBody.rows
    ,data
;
//2：获取数据
function getData() {
    var xml=new XMLHttpRequest()
    xml.open('GET','data/data1.txt',false);
    xml.onreadystatechange=function () {
        if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
            data=utils.jsonParse(xml.responseText);
        }
    }
    xml.send();
}
getData();
//3：绑定数据
function bind() {
    var frg=document.createDocumentFragment();
    for(var i=0; i<data.length; i++){
        var cur=data[i];
        var oTr=document.createElement('tr');
        for(var attr in cur){
            if(attr==='sex'){
                cur[attr]=cur[attr]==0?'男':'女';
            }
            var oTd=document.createElement('td');
            oTd.innerHTML=cur[attr];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr)
    }
    tBody.appendChild(frg);
    frg=null;
}
bind();
//4：隔行换色
function changeColor() {
    for(var i=0; i<aRows.length; i++){
        aRows[i].className='bg'+i%3;
        aRows[i].oldBg='bg'+i%3;
        //鼠标移入移出
        aRows[i].onmouseover=function () {
            this.className='changebg';
        };
        aRows[i].onmouseout=function () {
            this.className=this.oldBg;
        };
    }
}
changeColor();
//5：点击排序
function sort(n) {
    for(var i=0; i<aCells.length; i++){
        aCells[i].flg=n===i?aCells[i].flg*-1:-1;
    }
    //1:类数组转数组
    var ary=[].slice.call(aRows);
    //2:sort排序
    ary.sort(function (a,b) {
        a=a.cells[n].innerHTML;
        b=b.cells[n].innerHTML;
        if(isNaN(a) || isNaN(b)){
            return a.localeCompare(b)**aCells[n].flg;
        }
        return (a-b)*aCells[n].flg;
    });
    //3:重新插入页面
    var frg=document.createDocumentFragment();
    for(var i=0; i<ary.length; i++){
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg=null;
    changeColor();
}
for(var i=0; i<aCells.length; i++){
    var cur=aCells[i];
    if(cur.className==='cursor'){
        cur.index=i;
        cur.flg=-1;
        cur.onclick=function () {
            sort(this.index)
        }
    }
}
console.log(data);
