//1:获取元素 2：获取数据 3:绑定该数据 4:隔行换色 5：表格排序
//1:获取元素
var $tab=$('#table1')
    ,$thead=$tab.find('thead')
    ,$cells=$thead.find('th')
    ,$tbody=$tab.find('tbody')
    ,$rows
    ,data
;
//2：获取数据
function getData() {
    $.ajax({
        type:'GET',
        url:'data/data1.txt',
        dataType:'json',
        async:false, //同步
        success:function (val) {
            data=val;
            //console.log(data)
        }
    })
}
getData();
//3:绑定该数据
function bind() {
    //原生JS和jquery之间的转换：1）原生转jquery  $();  2)jquery转原生：[0] .get(0)
    var $frg=$(document.createDocumentFragment());
    for(var i=0; i<data.length; i++){
        var cur=data[i];
        cur.sex=cur.sex==0?'男':'女';
        var $tr=$('<tr>\
            <td>'+cur.name+'</td>\
            <td>'+cur.age+'</td>\
            <td>'+cur.force+'</td>\
            <td>'+cur.sex+'</td>\
            </tr>');
        $frg.append($tr);
    }
    $tbody.append($frg);
    $frg=null;
    $rows=$tbody.find('tr');
}
bind();
//4:隔行换色
function changeColor() {
    $rows.each(function (index,item) {
        //当不知道别人传递多少实参的时候，可以通过打印arguments，来决定自己写几个形参；
        //jquery的each中拿到的每个item都是原生的；jquery中的this-》$(this)
        $(this).addClass('bg'+index%3);
        $(this).hover(function () {
            $(this).addClass('changebg')
        },function () {
            $(this).removeClass('changebg')
        })

    })
}
changeColor();


















