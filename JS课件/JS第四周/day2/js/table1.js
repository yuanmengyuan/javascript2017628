//1:获取元素  2：获取数据  3：绑定数据 4：隔行换色 5：表格排序
//1:获取元素  :table thead th tbody tr
var oTab=document.getElementById('table1');
var tHead=oTab.tHead; //获取thead，注意表头是唯一的；
var aCells=tHead.rows[0].cells; //获取thead中第一行下的所有列；
var tBody=oTab.tBodies[0]; //因为表体有多个，所以，我们获取第一个；
var aRows=tBody.rows;//获取表体下所有的行；
var data;

//2：获取数据
function getData() {
    //1：创建一个对象
    var xml=new XMLHttpRequest();
    //2:打开地址
    xml.open('GET','data/data1.txt',false);
    //3:相应请求
    xml.onreadystatechange=function () {
        //1:准备好了 xml.readyState==4 ; 2: /^2\d{2}$/.test(xml.status)
        if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
            data=utils.jsonParse(xml.responseText);

        }
    };
    //4:发送请求
    xml.send(null);
}
getData();
//3：绑定数据
/*function bind() {
    //字符串拼接
    var str='';
    for(var i=0; i<data.length; i++){
        var cur=data[i];
        cur.sex = cur.sex==0?"男":"女";
        str+='<tr>\
            <td>'+cur.name+'</td>\
            <td>'+cur.age+'</td>\
            <td>'+cur.force+'</td>\
            <td>'+cur.sex+'</td>\
            </tr>';
    }
    tBody.innerHTML=str;
}*/
function bind() {
    var frg=document.createDocumentFragment();
    for(var i=0; i<data.length; i++){
        var cur=data[i];
        //有多少行，取决于有多少数据；
        var oTr=document.createElement('tr');
        //列：有多少列，取决于每组数据有多少个键值对；
        for(var attr in cur){
            if(attr==='sex'){//先判断属性名是性别sex，然后才对值进行处理；
                cur[attr]=cur[attr]===0?'男':'女';
            }
            var oTd=document.createElement('td');
            oTd.innerHTML=cur[attr];
            //需要把创建好的每个oTd都放入到oTr里去；
            oTr.appendChild(oTd);
        }
        //tr进文档碎片中去；
        frg.appendChild(oTr);
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
        aRows[i].onmouseover=function () {
            this.className='changebg';
        };
        aRows[i].onmouseout=function () {
            this.className=this.oldBg;
        };
    }
}
changeColor();
//5：表格排序:当鼠标移到谁身上有小手的话，就有排序功能；
function sort(n) {
    //点击谁的时候，谁的flg进行1和-1的切换，没有被点击的列表，都恢复成-1；
    for(var i=0; i<aCells.length; i++){
        aCells[i].flg = n===i ?aCells[i].flg*-1:-1;
        /*if(i===n){
            aCells[i].flg*=-1;
        }else{
            aCells[i].flg=-1;
        }*/
    }
    //1:类数组转数组
    var ary=utils.makeArray(aRows);
    //2:sort排序
    ary.sort(function (a,b) {
        a=a.cells[n].innerHTML; //拿到当前行的第一列的内容
        b=b.cells[n].innerHTML;
        //分别处理汉字和数字；
        if(isNaN(a) || isNaN(b)){
            //走的汉字；
            return a.localeCompare(b)*aCells[n].flg;
        }
        return (a-b)*aCells[n].flg;//这里比较的是数字
    })
    //3:重新插入页面
    var frg=document.createDocumentFragment();
    for(var i=0; i<ary.length; i++){
        var cur=ary[i];
        frg.appendChild(cur);
    }
    tBody.appendChild(frg);
    frg=null;
    changeColor();
}
for(var i=0; i<aCells.length; i++){
    if(aCells[i].className==='cursor'){
        aCells[i].index=i;//添加自定义属性-索引；
        aCells[i].flg=-1;
        aCells[i].onclick=function () {
            sort(this.index);
        }
    }
}
