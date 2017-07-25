(function () {
    var $add_task=$('.add_task')
        ,$add_task_btn=$add_task.find('button')
        ,$add_task_content=$add_task.find('input[type=text]')
        ,$task_list=$('.task_list')
        ,task_list=store.get('task_list_data')||[]
    ;

    store_get();
    //进行表单submit提交，必须把事件加给表单元素；不能加给里面的按钮；
    $add_task.on('submit',listen_submit_addTask);
    //给add_task表单，添加submit事件；当点击按钮的时候，提交内容数据
        //数据-》对象-》数组-》客户端
    function listen_submit_addTask(e) {
        var task_list_item={}
        //事件对象：jquery中的事件对象e是兼容的；
        e.preventDefault();//阻止默认事件
        //给客户端存数据；
        task_list_item.content=$add_task_content.val();
        if(task_list_item.content){
            store_set(task_list_item)
            refreshData();
        }

    }
    //更新数据
    function refreshData() {
        store_get();
    }
    function store_set(data) {
        //希望把对象数据存入数组，同时把数组存到客户端
        task_list.push(data) //存到数组；
        store.set('task_list_data',task_list);//把数组存到客户端
    }
    //拿到数据，渲染页面；
    function store_get() {
        var data=store.get('task_list_data')||[];
        data.length && render_task_list(data);
    }
    //根据数据，进行字符串拼接，然后渲染页面；
    function render_task_list(data) {
        var str='';
        for(var i=0; i<data.length; i++){
            str+='<div class="tasks_item">\
                <input type="checkbox">\
                <span class="content">'+data[i].content+'</span>\
                <span class="action">\
                <span class="del">删除</span>\
                <span class="detail">详情</span>\
                </span>\
                </div>';
        }
        $task_list.html(str);
    }
})();
