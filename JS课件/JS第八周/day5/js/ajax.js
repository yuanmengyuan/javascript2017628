function json2url(json) {
    json.t=new Date().getTime();
    var ary=[];
    for(var attr in json){
        ary.push(attr+'='+json[attr])
    }
    return ary.join('&')
}
function ajax(opt) {
    if(!opt.url) return;
    //设置默认值；
    var url=opt.url
        ,type=opt.type||'GET'
        ,data=opt.data||{}
        ,jsonp=opt.jsonp||'callback'
        ,dataType=opt.dataType
        ,fnLoading=opt.fnLoading
        ,complete=opt.complete
        ,success=opt.success
        ,error=opt.error
        ,timeout=opt.timeout||300
        ,timer
    ;
    var xml=new XMLHttpRequest();
    switch(type.toLowerCase()){
        case 'get':
            xml.open('GET',url+'?'+json2url(data),true);
            xml.send(null);
            break;
        case 'post':
            xml.open('POST',url,true);
            xml.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
            xml.send(json2url(data));
            break;
        case 'jsonp':
            var fnName='jsonp_'+Math.random();
            fnName=fnName.replace('.','');
            window[fnName]=function (data) {
                success && success(data);
                //卸磨杀驴
                document.body.removeChild(oS);
            };
            data[jsonp]=fnName;
            var oS=document.createElement('script');
            oS.src=url+'?'+json2url(data);
            document.body.appendChild(oS);
            break;
    }
    fnLoading && fnLoading();
    xml.onreadystatechange=function () {
        if(xml.readyState===4){
            complete && complete();
            clearTimeout(timer);
            if(/^2\d{2}$/.test(xml.status)){
                //判断返回的数据格式
                if(dataType==='json'){
                    success && success(JSON.parse(xml.responseText))
                }else{
                    success && success(xml.responseText)
                }
            }else{
                error && error(xml.statusText)
            }
        }
    }

    if(type==='jsonp') return;
    //网络响应时间
    timer=setTimeout(function () {
        alert('网速不行。。。。。')
        xml.onreadystatechange=null;
        clearTimeout(timer);
    },timeout)
}