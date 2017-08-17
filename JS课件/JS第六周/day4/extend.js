$.fn.extend({
    tab:function () {
        var $li=this.find('li');
        var $div=this.find('div');
        $li.on('click',function () {
            $(this).addClass('on').siblings('li').removeClass('on');
            $div.eq($(this).index()).addClass('show').siblings('div').removeClass('show');
        })
    }
})