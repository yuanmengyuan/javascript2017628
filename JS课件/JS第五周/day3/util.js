var util=(function () {
    var flg='getComputedStyle' in window; //惰性思想；
    return {
        makeArray:function (arg) {
            var ary=[];
            if(flg){
                ary=Array.prototype.slice.call(arg)
            }else{
                for(var i=0; i<arg.length; i++){
                    ary.push(arg[i]);
                }
            }
            return ary;
        },
        jsonParse:function (jsonStr) {
            return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')');
        },
        win:function (attr,value) {
            if(typeof value === 'undefined'){
                //获取
                return document.documentElement[attr]||document.body[attr];
            }
            //设置
            document.documentElement[attr]=document.body[attr]=value;
        },
        offset:function (curEle) {
            var par=curEle.offsetParent;
            var l=curEle.offsetLeft;
            var t=curEle.offsetTop;

            while(par){
                //判断非IE8浏览器
                if(window.navigator.userAgent.indexOf('MSIE 8.0')===-1){
                    l+=par.clientLeft;
                    t+=par.clientTop;
                }
                l+=par.offsetLeft;
                t+=par.offsetTop;
                par=par.offsetParent;
            }
            return {left:l,top:t}
        },
        getCss:function (curEle,attr) {
            var val,reg;
            if(flg){
                val=getComputedStyle(curEle,false)[attr];
            }else{//IE678
                if(attr==='opacity'){
                    val=curEle.currentStyle.filter;
                    reg=/^alpha\(opacity[=:](\d+)\)$/;
                    return reg.test(val)?reg.exec(val)[1]/100:1;
                }else{
                    val=curEle.currentStyle[attr];
                }
            }
            reg=/^([+-]?(\d|([1-9]\d+))(\.\d+)?)(px|pt|rem|em)$/g;
            return reg.test(val)?parseFloat(val):val;
        },
        rnd:function (n,m) {
            n=Number(n);
            m=Number(m);
            //如果用户传参不是数字，给个提示
            if(isNaN(n) || isNaN(m)){
                return Math.random(); //当返回结果为0-1之间的随机小数的时候，代表传参错误；
            }
            if(n>m){
                var tmp=m;
                m=n;
                n=tmp;
            }
            return Math.round(Math.random()*(m-n)+n);
        }
    }
})();