var util=(function(){
    return {
        win:function (attr,value) {
            if(typeof value==='undefined'){//获取
                return document.documentElement[attr]||document.body[attr];
            }
            document.documentElement[attr]=document.body[attr]=value;
        },
        offset:function (curEle) {
            var par=curEle.offsetParent;
            var l=curEle.offsetLeft;
            var t=curEle.offsetTop;
            while(par){
                //判断不是IE8的，需要加边框
                if(window.navigator.userAgent.indexOf('MSIE 8.0')==-1){
                    l+=par.clientLeft;
                    t+=par.clientTop;
                }
                l+=par.offsetLeft;
                t+=par.offsetTop;
                par=par.offsetParent;
            }
            return {left:l,top:t};
        },
        getCss:function (curEle,attr) {
            var val,reg;
            if('getComputedStyle' in window){
                val=getComputedStyle(curEle,false)[attr]
            }else{
                if(attr==='opacity'){
                    val=curEle.currentStyle['filter'];
                    reg=/^alpha\(opacity[=:](\d+)\)$/;
                    return reg.test(val)?RegExp.$1/100:1;
                }else{
                    val=curEle.currentStyle[attr];
                }
            }
            //去除单位
            reg=/^([+-]?(\d|([1-9]\d+))(\.\d+)?)(px|pt|rem|em)$/g;
            return reg.test(val)?parseFloat(val):val;
        }
    }
})();