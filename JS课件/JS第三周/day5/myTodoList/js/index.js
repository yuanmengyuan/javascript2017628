;(function () {
    var store_data=[]
        ,$form_add_task=$('.add_task')
        ,$add_task_btn=$form_add_task.children('button')
        ,$add_task_con=$form_add_task.children('input')
        ,$task_list=$('.task_list')
        ,$del
        ,$detail
        ,$task_detail=$('.task_detail')
        ,$task_mask=$('.task_mask')
        ,$detail_con
        ,$detail_con_text
        ,$detail_textarea
        ,$detail_date
        ,$detail_submit
        ,$task_item
        ,$checkbox
        ,$notify=$('.notify')
        ,$notify_btn=$notify.find('button')
        ,$audio=$('audio')
    ;
    init();
    function init() {
        getStore();//获取数据并且渲染页面；
        listen_job_start();
    }

    //监听任务执行时间；
    function listen_job_start() {
        //定时器:
        //定时器不是越小越块，在一定程度下，是越小越不准确；
        var timer=setInterval(function () {
            for(var i=0; i<store_data.length; i++){
                var cur=store_data[i];
                var compare=new Date(cur.date)-new Date();
                if(compare<=0){
                    if(cur.complete){
                        clearInterval(timer);
                        //alert(i)
                        notify(i);
                        continue;
                    }
                    //alert('该执行任务了');
                    cur.complete=true;
                    console.log(cur.complete)
                    store.set('store_data',store_data);
                    refreshData();
                }
            }
        },50)
    }
    function notify(index) {
        var data=store_data[index];
        var str='<div><span>提醒：'+data.content+'</span></div>';
        $notify.prepend($(str)).show();
        $audio[0].play();//播放音频；
        $notify_btn.on('click',function () {
            $notify.hide();
        })
    }
    //监听表单的submit事件
    $form_add_task.on('submit',function (e) {
        e.preventDefault();
        var content=$add_task_con.val();
        if(content) {
            //先存入数组
            store_data.push({
                "content":content
            });
            refreshData();
        }
    });
    //更新数据，更新页面；
    function refreshData() {
        setStore();
        getStore();
    }
    //存储数据
    function setStore(content) {
        //存到客户端
        store.set('store_data',store_data);
    }
    //获取数据
    function getStore() {
        store_data=store.get('store_data')||[];
        console.log(store_data)
        store_data.length && render_task_list()
    }
    //渲染一堆元素，渲染列表
    function render_task_list() {
        $task_list.html('');
        for(var i=0; i<store_data.length; i++){
            var item=render_task_item(store_data[i],i);
           if(store_data[i].checked){//任务完成了
               item.appendTo($task_list).addClass('through');
           }else{
               item.prependTo($task_list).removeClass('through');
           }
        }
        $del=$('.delete');
        $add_task_con.val('');

        $detail=$('.detail');
        $task_item=$('.task_item');
        $checkbox=$('input[type=checkbox]');
        //添加详情按钮点击显示事件
        listen_detail_event();
        //添加删除按钮的点击事件
        listen_del_event();
        //双击task_item显示详情框
        listen_del_taskitem();
        //监听任务完成事件；
        listen_select_checkbox();
    }
    function listen_select_checkbox() {
        $checkbox.on('click',function () {
           //剪切功能； append prepend都有剪切功能；
            //思路：当谁被选中的时候，我们就让谁的容器剪切到末尾，同时，增加删除线；
            var bok=$(this).is(':checked');
            var parent=$(this).parent();
            var index=parent.attr('index');
            //先存到数组；
            store_data[index].checked=bok;
            refreshData();
        })
    }
    function listen_del_taskitem() {
        $task_item.on('dblclick',function () {
            var index=$(this).attr('index');
            show_task_detail(index)
        })
    }
    function listen_detail_event() {
        $detail.on('click',function () {
            var parent=$(this).parent().parent();
            var index=parent.attr('index');
            show_task_detail(index);
        })
    }
    function show_task_detail(index) {
        $task_detail.show();
        $task_mask.show();
        render_task_detail(index);
        listen_del_content();
        listen_detail_submit(index);
        listen_mask_event();
    }
    function listen_mask_event() {
        $task_mask.on('click',hide_task_detail);
    }
    function listen_del_content() {
        $detail_con.on('dblclick',function () {
            //让当前元素隐藏，让下一个元素显示；
            $(this).hide().next().show();
        })
    }
    function listen_detail_submit(index) {
        var data=store_data[index];//拿到对应的数据
        var bok=false;
        $task_detail.on('submit',function (e) {
            if(bok) return;
            bok=true;
            e.preventDefault();
            //更新了数组的内容
            data.content=$detail_con_text.val()||$detail_con.html();
            data.textarea=$detail_textarea.val()||'';
            data.date=$detail_date.val();
            refreshData();//只是更新了客户端和用户列表的展示
            render_task_detail(index);//渲染详情框
            hide_task_detail();
        })
    }

    function hide_task_detail() {
        $task_detail.hide();
        $task_mask.hide();
    }
    function render_task_detail(index) {
        var data=store_data[index];
        $task_detail.html('<div class="content">'+data.content+'</div>\
        <input style="display: none" type="text" class="contentText" value="'+data.content+'">\
            <textarea name="" id="">'+(data.textarea||'')+'</textarea>\
            <input type="text" class="date" value="'+data.date+'">\
            <button type="submit">更新</button>');
        //只有等详情框的内容，都插入页面以后，才能赋值；
        $detail_con=$task_detail.find('.content');
        $detail_con_text=$task_detail.find('.contentText');
        $detail_textarea=$task_detail.find('textarea');
        $detail_date=$task_detail.find('.date');
        $detail_submit=$task_detail.find('button');
        $detail_date.datetimepicker();
    }
    function listen_del_event() {
        $del.on('click',function () {
            //拿到索引；
            var parent=$(this).parent().parent();
            var index=parent.attr('index');
            var res=confirm('确定要删除吗？')
            //删除
            if(res){
                parent.remove(); //删除
                store_data.splice(index,1);//删除数组；
                refreshData();
            }
        })
    }
    function render_task_item(data,index) {
        var checked= data.checked?"checked":"";
        var str='<div class="task_item"  index="'+index+'">\
                <input type="checkbox" '+checked+'>\
                <span>'+data.content+'</span>\
                <span class="action">\
                <span class="delete">删除</span>\
                <span class="detail">详情</span>\
                </span>\
                </div>';
        return  $(str);
    };
})();
