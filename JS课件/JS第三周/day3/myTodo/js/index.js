;(function () {
    var $form_add_task=$('.add_task')
        ,$add_task_content=$form_add_task.find('input[type=text]')
        ,$add_task_btn=$form_add_task.find('button')
        ,$store_data=[]
        ,$task_list=$('.task_list')
        ,$del
    ;

    init();
    //给表单加submit事件，把数据提交到客户端
    $form_add_task.on('submit',function (e) {
        //阻止默认事件
        e.preventDefault();
        var content=$add_task_content.val();
        if(content){
            //把数据存到客户端；
            add_store(content);
            get_store();
        }
    });
    function init() {
        get_store();

    }
    //从客户端获取最新的数据--重新渲染页面；
    function get_store() {
        //1:从客户端拿到数据；
        $store_data=store.get('store_data')||[];
        console.log($store_data);
        //2:根据数据渲染页面；
        $store_data.length && render_task_list();//如果有数据，就用数据去渲染页面；
    }
    //给客户端存储最新的数据；
    function add_store(content){
        //2：先把数据存到数组中去；
        $store_data.push({
            content:content
        });
        //3:把数组存到客户端去；
        store.set('store_data',$store_data)
    }
    //渲染一堆页面； 思路2：通过动态创建渲染页面；
    function render_task_list() {
        //思路2：通过动态创建
        $task_list.empty();
        //$task_list.html('');//每次插入前，都先清空以前的内容；
        for(var i=0; i<$store_data.length; i++){
            var item=render_task_item($store_data[i],i);
            //$task_list.append(item)
            item.appendTo($task_list);
        }
        $add_task_content.val('');
        //等到数据插入页面以后，才能获取delete元素；
        $del=$('.delete');
        listen_delete_event();
    }
    function listen_delete_event() {
        $del.on('click',function () {
            var parent=$(this).parent().parent();
            var index=parent.attr('index');//拿到当前容器对应的索引；
            var res=confirm('亲，确定要删除？');
            if(res){
                parent.remove();
                $store_data.splice(index,1);//只是一个普通的数组中删除了不要的数据；
                refresh_page();//重新更新客户端的数据，并重新渲染页面；
            }
        })
    }
    //当数组发生变量的时候，就得重新的改变客户端的数据，同时，当客户端的数据发生更改的时候，就得重新渲页面；
    function refresh_page() {
        //当数组发生变更的时候，我们希望客户端同步发生变更；
        store.set('store_data',$store_data);
        //当客户端的数据变更的时候，我们希望页面同步渲染；
        get_store();
    }
    //创建一个对象
    function render_task_item(itemData,index) {
        //传进来的index，就是当前元素的索引；这个索引是自定义属性；
        var str='<div class="task_item" index="'+index+'">\
            <input type="checkbox">\
            <span>'+itemData.content+'</span>\
            <span class="action">\
            <span class="delete">删除</span>\
            <span class="detail">详情</span>\
            </span>\
            </div>';
        return $(str);//返回的是一个jquery对象；
    }
    //思路1：通过字符串拼接渲染页面
    /*function render_task_list(data){
        //思路1：字符串拼接；
        var str='';
        for(var i=0; i<data.length; i++){
            str+='<div class="task_item">\
                <input type="checkbox">\
                <span>'+data[i].content+'</span>\
                <span class="action">\
                <span class="delete">删除</span>\
                <span class="detail">详情</span>\
                </span>\
                </div>';
        }
        //把拼接好的字符串，放入指定的容器；
        $task_list.html(str);
        //清空内容框
        $add_task_content.val(''); //思路1：让input内容为空；
    }*/


})();
