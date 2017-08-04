//1:获取元素 2：获取数据 3：绑定数据 4：隔行换色 5：表格排序
var $tab=$('#tab');
var thead=$tab.find('thead');
var cells=thead.find('th');
var tbody=$tab.find('tbody');
var rows;
var data;
//2：获取数据
function getData() {
    $.ajax({
        type:'get',
        url:'data1.txt',
        async:false,
        dataType:'json',
        success:function (val) {
            data=val;
        }
    })
}
getData()
//3：绑定数据
function bind() {
    var str='';
    for(var i=0; i<data.length; i++){
        str+='<tr>\
            <td>'+data[i].name+'</td>\
            <td>'+data[i].age+'</td>\
            <td>'+data[i].force+'</td>\
            <td>'+data[i].sex+'</td>\
            </tr>';
    }
    tbody.html(str);
}
bind();
//4:隔行换色
function changebg() {
    rows=tbody.find('tr');
    rows.each(function (index,item) {
        $(item).attr('class','').addClass('bg'+index%3).hover(function () {
            $(this).addClass('changebg');
        },function () {
            $(this).removeClass('changebg');
        });
    })
}
changebg()
//5：表格排序
function sort(n) {
    //遍历的是列；
    cells.each(function (index,item) {
       /* if(n===index){
            var flg=$(item).attr('flg')*-1;
            $(item).attr('flg',flg)
        }else{
            $(item).attr('flg',-1)
        }*/
       if(n==index){
           item.flg*=-1;
       }else{
           item.flg=-1;
       }
    });
    //var reverse=cells.eq(n).attr('flg');
    //jquery转原生有两种方式：[],get()
    var reverse=cells[n].flg;
    var ary=$.makeArray(rows);
    ary.sort(function (a,b) {
        a=a.cells[n].innerHTML;
        b=b.cells[n].innerHTML;
        if(isNaN(a) || isNaN(b)){
            return a.localeCompare(b)*reverse;
        }
        return (a-b)*reverse;
    })
    var frg=document.createDocumentFragment();
    for(var i=0; i<ary.length; i++){
        frg.appendChild(ary[i]);
    }
    tbody.append($(frg));
    changebg();
}
cells.each(function (index,item) {
    if(item.className==='cursor'){
        /*$(item).on('click',function () {
            sort(index)
        }).attr('flg',-1);*/
        item.flg=-1;
        $(item).on('click',function () {
            sort(index)
        })
    }
})
















