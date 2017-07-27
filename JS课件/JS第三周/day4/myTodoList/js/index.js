;(function () {
    //核心思路：找到谁，给谁加什么事件，想做什么事
    var $form_add_task=$('.add_task')
        ,$content=$form_add_task.children('input')
        ,$add_task_btn=$form_add_task.children('button')
        ,task_data=[]
        ,$task_list=$('.task_list')
        ,$del
        ,$detail
        ,$task_detail=$('.task_detail')
        ,$task_mask=$('.task_mask')
        ,$task_item
        ,$detail_content
        ,$detail_content_txt
        ,$detail_textarea
        ,$detail_date
        ,$detail_submit
    ;
    init();
    //需要给表单添加submit事件
    $form_add_task.on('submit',function (e) {
        //阻止默认事件；
        e.preventDefault();
        //拿到content的值，如果值为真的时候，把值先存到数组，再存到客户端；
        var content=$content.val();
        if(content){
            set_store(content);//存数据
            get_store();//取数据并且渲染页面
        }
    });
    //添加更新按钮的监听事件
    function listen_submit_update(index) {
        var bok=false;
        $task_detail.on('submit',function (e) {
            if(bok) return;//阻断程序执行的作用；
            bok=true;
            e.preventDefault();
            var data=task_data[index];
            data.content=$detail_content_txt.val();
            data.detail=$detail_textarea.val();
            data.date=$detail_date.val();
            refresh_data();
            //在用localstorage中的数据重新渲染detail;
            render_detail_data(index);
            hide_detail();
            //需要把content，textarea，data的数据存到store中去；
        })
    }
    function init() {
        get_store()
    }
    //1：获取客户端的数据
    function get_store() {
        task_data=store.get('task_data')||[];
        console.log(task_data)
        //如果数据为真，才会渲染页面
        task_data.length && render_task_list()
    }
    //2:给客户端存储数据
    function set_store(content) {
        //现在只是存到了数组；
        task_data.push({
            content
        });
        //把数组存到客户端
        store.set('task_data',task_data)
    }
    //3:通过数据渲染页面--通过遍历，创建一堆
    function render_task_list() {
        $task_list.empty();
        for(var i=0; i<task_data.length; i++){
            var item=render_task_item(task_data[i],i);
            //$task_list.append(item);
            item.appendTo($task_list);
        }
        $content.val('');
        //只有数据绑定成功后，才能获取到删除按钮；
        $del=$('.delete');
        $detail=$('.detail');
        $task_item=$('.task_item');
        //监听删除按钮的点击事件
        listen_del_btn();
        listen_detail_event();
        listen_mask_event();
        listen_dblclick_event();
    }
    function listen_dblclick_event() {
        $task_item.on('dblclick',function () {
            var index=$(this).attr('index');
            show_detail(index);
        })
    }
    function listen_mask_event() {
        $task_mask.on('click',function () {
            hide_detail()
        })
    }
    function listen_detail_event() {
        $detail.on('click',function () {
            //详情的点击事件发生的时候，拿到当前元素的父容器的索引；
            var parent=$(this).parent().parent();
            var index=parent.attr('index');
            show_detail(index);
        })
    }
    function hide_detail() {
        $task_detail.fadeOut();
        $task_mask.fadeOut();
    }
    //让详情框和遮罩都显示；
    function show_detail(index) {
        $task_detail.fadeIn();
        $task_mask.fadeIn();

        render_detail_data(index);
        listen_submit_update(index);
        content_dblclick_event();
    }
    function content_dblclick_event() {
        $detail_content.on('dblclick',function () {
            $(this).hide();
            $(this).next().show();
        })
    }
    function render_detail_data(index) {
        var str='<div class="content">'+task_data[index].content+'</div>\
        <input type="text" style="display: none" class="contentTxt" value="'+task_data[index].content+'"/>\
            <textarea name="" id="">'+(task_data[index].detail || '')+'</textarea>\
            <input type="date" class="date" value="'+task_data[index].date+'">\
            <button type="submit">更新</button>';
        $task_detail.html(str);
        $detail_content=$task_detail.find('.content');
        $detail_content_txt=$task_detail.find('.contentTxt');
        $detail_textarea=$task_detail.find('textarea');
        $detail_date=$task_detail.children('.date');
        $detail_submit=$task_detail.find('button');
    }
    function listen_del_btn() {
        $del.on('click',function () {
            //找到我是哪个编号下面的按钮；
            var parent=$(this).parent().parent();
            var index=parent.attr('index');
            var res=confirm('亲，确定要删除？')
            if(res){
                parent.remove();
                task_data.splice(index,1);//删除数组中的数据；
                refresh_data();//更新客户端的数据；
            }
        })
    }
    function refresh_data() {
        store.set('task_data',task_data);//更新客户端的数据；
        get_store();
    }
    //先创建一个元素
    function render_task_item(itemData,index){
        //用自定义属性存值，是一种特别常见的存储方法；
        var str='<div class="task_item" index="'+index+'">\
            <input type="checkbox">\
            <span>'+itemData.content+'</span>\
            <span class="action">\
            <span class="delete">删除</span>\
            <span class="detail">详情</span>\
            </span>\
            </div>';
        return $(str);//把字符串变成了一个jquery对象；
    }
})();
