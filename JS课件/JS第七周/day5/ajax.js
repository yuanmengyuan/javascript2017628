function json2url(json) {
    json.t=new Date().getTime();//时间戳；
    var ary=[];
    for(var attr in json){
        ary.push(attr+'='+json[attr]);
    }
    return ary.join('&');
}
function jsonParse(jsonStr) {
    return 'JSON' in window? JSON.parse(jsonStr) : eval('('+jsonStr+')');
}
function ajax(opt) {
    if(!opt.url) return;
    var url=opt.url
        ,type=opt.type||'GET' //jsonp
        ,jsonp=opt.jsonp||'callback'
        ,data=opt.data||{}
        ,dataType=opt.dataType
        ,fnLoading=opt.fnLoading
        ,complete=opt.complete
        ,success=opt.success
        ,error=opt.error
        ,timeout=opt.timeout||500
        ,timer=null
    ;
    //ajax四步走：
    //1:创建一个xml的对象
    var xml=new XMLHttpRequest();
    //2:打开地址 xml.open(type,url,true);
    //switch是严格比较：===
    switch (type.toLowerCase()){
        case 'get':
            xml.open('GET',url+'?'+json2url(data),true);
            //3：发送请求
            xml.send(null);
            break;
        case 'post':
            xml.open('POST',url,true);
            xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xml.send(json2url(data)); //通过请求体把参数传给后台；
            break;
        case 'jsonp':
            //1:创建一个全局函数
            var fnName='jsonp_'+Math.random();
            fnName=fnName.replace('.','');
            window[fnName]=function (val) {
                //3：拿到别人传进来的数据
                success && success(val);
                //卸磨杀驴
                document.body.removeChild(oS);
            };
            //拼接地址；
            data[jsonp]=fnName;
            //2:通过script的src属性发起跨域请求
            var oS=document.createElement('script');
            oS.src=url+'?'+json2url(data);
            document.body.appendChild(oS);
            break;
    }
    fnLoading && fnLoading();
    //4:响应请求
    xml.onreadystatechange=function () {
        if(xml.readyState===4){
            complete && complete();
            clearTimeout(timer);
            if(/^2\d{2}$/.test(xml.status)){
                //成功
                if(dataType==='json'){
                    success && success(jsonParse(xml.responseText))
                }else{
                    success && success(xml.responseText);
                }
            }else{
                //失败
                error && error(xml.responseText)
            }
        }
    };
    if(type=='jsonp') return;
    timer=setTimeout(function () {
        alert('网速不行嘛！！！');
        xml.onreadystatechange=null;
        clearTimeout(timer);
    },timeout)
}