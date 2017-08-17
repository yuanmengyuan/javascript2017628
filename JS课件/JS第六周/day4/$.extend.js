jQuery.extend({
    tab:function (el) {
        var $wrap=$(el);
        var $li=$wrap.find('li');
        var $div=$wrap.find('div');
        $li.on('click',function () {
            $(this).addClass('on').siblings('li').removeClass('on');
            $div.eq($(this).index()).addClass('show').siblings('div').removeClass('show');
        })
    }
});
function Fn() {

}