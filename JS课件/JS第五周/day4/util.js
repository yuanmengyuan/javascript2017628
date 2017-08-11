var util=(function () {
    var flg="getComputedStyle" in window;
    function makeArray(arg) {
        var ary=[];
        if(flg){
            ary=Array.prototype.slice.call(arg);
        }else{
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i]);
            }
        }
        return ary;
    }
    function jsonParse(jsonStr) {
        return 'JSON' in window? JSON.parse(jsonStr):eval('('+jsonStr+')');
    }
    function rnd(n,m) {
        n=Number(n);
        m=Number(m);

        if(isNaN(n) || isNaN(m)){
            return Math.random();
        }

        if(n>m){
            var tmp=m;
            m=n;
            n=tmp;
        }
        return Math.round(Math.random()*(m-n)+n);
    }
    function getByClass(strClass,parent) {
        //parent可有可无
        parent=parent||document;
        //判断浏览器是否支持，如果支持，直接使用
        if(flg){
            return this.makeArray(parent.getElementsByClassName(strClass));
        }
        //自己做兼容处理
        //1:去除首尾空格，转成数组
        var aryClass=strClass.replace('/^ +| +$/g','').split(/\s+/g);
        //获取当前容器下的所有元素
        var nodeList=parent.getElementsByTagName('*');
        var ary=[];
        for(var i=0; i<nodeList.length; i++){
            var cur=nodeList[i];
            var bok=true;
            for(var j=0; j<aryClass.length; j++){
                var reg=new RegExp('(^| +)'+aryClass[j]+'( +|$)');
                if(!reg.test(cur.className)){
                    bok=false;
                    break;
                }
            }
            if(bok){
                ary.push(cur);
            }
        }
        return ary;

    }
    function hasClass(curEle,cName) {
        var reg=new RegExp('(^| +)'+cName+'( +|$)');
        return reg.test(curEle.className);
    }
    function addClass(curEle,strClass) {
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0; i<aryClass.length; i++){
            if(!this.hasClass(curEle,aryClass[i])){
                curEle.className+=' '+aryClass[i];
            }
        }
    }
    function removeClass(curEle,strClass) {
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0; i<aryClass.length; i++){
            var reg=new RegExp('\\b'+aryClass[i]+'\\b');
            if(this.hasClass(curEle,aryClass[i])){
                curEle.className=curEle.className.replace(reg,' ').replace(/\s+/g,' ').replace(/(^ +)|( +$)/g,'')
            }
        }
    }
    return{
        makeArray,
        jsonParse,
        rnd,
        //getByClass:限定范围的通过class名来获取元素；
        getByClass,
        //hasClass:判断某个元素身上是否有某个class名
        hasClass,
        //addClass：如果元素身上没有某些class名，就添加
        addClass,
        //removeClass:如果元素身上有写class名，就把他移出
        removeClass,
        //getCss:获取元素的某个非行间样式；
        getCss:function (curEle,attr) {
            var val,reg;
            if(flg){
                val=getComputedStyle(curEle,null)[attr];
            }else{//IE678
                if(attr='opacity'){
                    val=curEle.currentStyle.filter;
                    reg=/^alpha\(opacity[=:](\d+)\)$/;
                    return reg.test(val)?reg.exec(val)[1]/100:1;
                }else{
                    val=curEle.currentStyle[attr];
                }
            }
            //去除单位
            reg=/^([+-]?(\d|([1-9]\d+))(\.\d+)?)(px|pt|rem|em)$/;
            return reg.test(val)?parseFloat(val):val;
        },
        //setCss：给一个元素身上，设置一个样式
        setCss:function (curEle,attr,value) {
            //3:float兼容处理；
            if(attr==='float'){
                curEle.style.styleFloat=value; //IE
                curEle.style.cssFloat=value; //标准浏览器
                return;
            }
            //2:设置透明度；
            if(attr ==='opacity'){
                curEle.style.opacity=value;
                curEle.style.filter='alpha(opacity='+(value*100)+')';
                return;//性能优化
            }
            //1:给value自动添加单位；
            var reg=/(fontSize|width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/ig;
            if(reg.test(attr) && value.toString().search(/(auto|%)/)==-1){
                value=parseFloat(value)+'px';
            }
            curEle.style[attr]=value;
        },
        //setGroupCss：设置一组样式  参数：2个
        setGroupCss:function (curEle,obj) {
            for(var attr in obj){
                this.setCss(curEle,attr,obj[attr]);
            }
        },
        //三合一：1）获取 2）设置一个 3）设置一组；
        css:function (el) {
            var arg2=arguments[1];
            if(typeof arg2==='string'){//设置一个或获取
                var arg3=arguments[2];
                if(typeof arg3==='undefined'){//无第三个参数：获取
                    return this.getCss(el,arg2)
                }else{//设置
                    this.setCss(el,arg2,arg3);
                }
            }
            if(arg2.toString()==='[object Object]'){//设置一组
                this.setGroupCss(el,arg2);
            }
        },
        win:function (attr,value) {
            if(typeof value === 'undefined'){
                return document.documentElement[attr]||document.body[attr];
            }
            document.documentElement[attr]=document.body[attr]=value;
        },
        offset:function (el) {
            var par=el.offsetParent;
            var l=el.offsetLeft;
            var t=el.offsetTop;
            while(par){
                //判断IE8
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
        getChildren:function (el,tagName) {
            var childs=el.childNodes;
            var ary=[];
            for(var i=0; i<childs.length; i++){
                var cur=childs[i];
                if(cur.nodeType==1){
                    if(typeof tagName==='undefined'){
                        ary.push(cur);
                    }else{
                        if(tagName.toLowerCase()===cur.tagName.toLowerCase()){
                            ary.push(cur);
                        }
                    }
                }
            }
            return ary;
        },
        prev:function (el) {
            if(flg){
                return el.previousElementSibling;
            }
            var pre=el.previousSibling;
            while(pre || pre.nodeType!==1){
                pre=pre.previousSibling;
            }
            return pre;
        },
        next:function (el) {
            if(flg){
                return el.nextElementSibling;
            }
            var nex=el.nextSibling;
            while(nex || nex.nodeType!==1){
                nex=nex.nextSibling;
            }
            return nex;
        },
        sibling:function (el) {
            var pre=this.prev(el);
            var nex=this.next(el);
            var ary=[];
            if(pre) ary.push(pre);
            if(nex) ary.push(nex);
            return ary;
        },
        prevAll:function (el) {
            var ary=[];
            var pre=this.prev(el);
            while(pre){
                ary.push(pre);
                pre=this.prev(pre);
            }
            return ary;
        },
        nextAll:function (el) {
            var ary=[];
            var nex=this.next(el);
            while(nex){
                ary.push(nex);
                nex=this.next(nex);
            }
            return ary;
        },
        siblings:function (el) {
            return this.prevAll(el).concat(this.nextAll(el));
        },
        index:function (el) {
            return this.prevAll(el).length;
        },
        firstChild:function (el) {
            var first=this.getChildren(el)[0];
            return first?first:null;
        },
        lastChild:function (el) {
            var children=this.getChildren(el);
            return children.length?children[children.length-1]:null;
        },
        appendChild:function (newEle,parent) {
          parent.appendChild(newEle);
        },
        prependChild:function (newEle,parent) {
            var first=this.firstChild(parent);//拿到父容器下第一个子元素；
            if(first){
                parent.insertBefore(newEle,first)
            }else{
                parent.appendChild(newEle);
            };
        },
        insertBefore:function (newEle,oldEle) {
            oldEle.parent.insertBefore(newEle,oldEle);
        },
        insetAfter:function (newEle,oldEle) {
            var nex=this.next(oldEle);//oldEle的弟弟；
            if(nex){
                oldEle.parentNode.insertBefore(newEle,nex);
            }else{
                oldEle.parentNode.appendChild(newEle);
            }
        }
    }
})();













