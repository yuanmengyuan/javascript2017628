var $tab=$('#table1')
    ,$thead=$tab.find('thead')
    ,$cells=$thead.find('th')
    ,$tbody=$tab.find('tbody')
    ,$rows
    ,data
;
// 1:获取数据
function getData() {
    $.ajax({
        type:'GET',
        url:'./data/data1.txt',
        async:false,
        dataType:'json',
        success:function (val) {
            data=val;
        }
    })
}
getData();
//2:绑定数据
function bind() {
   /* var frg=$(document.createDocumentFragment());
    for(var i=0; i<data.length; i++){
        var cur=data[i];
        cur.sex=cur.sex===0?'男':'女';
        //有多少组数据，就有多少个tr
        var $tr=$('<tr>\
            <td>'+cur.name+'</td>\
            <td>'+cur.age+'</td>\
            <td>'+cur.force+'</td>\
            <td>'+cur.sex+'</td>\
            </tr>');
        //frg.append($tr);
        $tr.appendTo(frg);
    }
    $tbody.append(frg);
    frg=null;*/
   var str='';
   for(var i=0; i<data.length; i++){
       data[i].sex=data[i].sex==0?'男':'女';
       str+='<tr>\
           <td>'+data[i].name+'</td>\
           <td>'+data[i].age+'</td>\
           <td>'+data[i].force+'</td>\
           <td>'+data[i].sex+'</td>\
           </tr>';
   }
   $tbody.html(str);
}
bind();
//3:隔行换色
function changeColor() {
    $rows=$tbody.find('tr');
    $rows.each(function (index,item) {
       /* $(item).addClass('bg'+index%3).on('mouseover',function () {
            $(this).addClass('changebg');
        }).on('mouseout',function () {
            $(this).removeClass('changebg');
        })*/
        $(item).attr('class','').addClass('bg'+index%3).hover(function () {
            $(this).addClass('changebg');
        },function () {
            $(this).removeClass('changebg');
        })
    })
}
changeColor();
//4:排序
function sort(n) {
    //点谁的时候，让谁*=-1；其他的都恢复成-1；
    $cells.each(function (index,item) {
        if(index==n){
            var flg=$(item).attr('flg')*-1;
            $(item).attr('flg',flg);
        }else{
            $(item).attr('flg',-1);
        }
    });
    //这里只是获取当前被点击的元素的flg属性值；
    var reverse=$cells.eq(n).attr('flg');
    //1:类数组转数组
    var ary=$.makeArray($rows);
    //2:sort排序
    ary.sort(function (a,b) {
        a=a.cells[n].innerHTML;
        b=b.cells[n].innerHTML;
        //汉字的判断
        if(isNaN(a) || isNaN(b)){
            return a.localeCompare(b)*reverse;
        }
        return (a-b)*reverse;
    });
    //3:把排好序的元素重新插入页面
    var frg=$(document.createDocumentFragment());
    for(var i=0; i<ary.length; i++){
        frg.append($(ary[i]))
    }
    $tbody.append(frg);
    frg=null;
    changeColor();
}
//遍历每列，看谁的class==cursor，就让谁有点击事件
$cells.each(function (index,item) {
    //判断谁的class==cursor，谁就有点击事件
    if($(item).attr('class')==='cursor'){
        //添加自定义属性；
        $(item).attr('flg',-1);
        $(item).on('click',function () {
            sort(index)
        })
    }
});
























