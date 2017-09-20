//配置地址；
require.config({
    paths:{
        "jquery":"https://cdn.bootcss.com/jquery/3.2.1/jquery",
        "c":"../lib/c"
    }
});
require(['jquery','c'],($,cb)=>{
    countDown();
    setInterval(countDown,1000)
    function countDown() {
        var res=cb.alertTime(new Date());
        $('span').html(res);
    }
});