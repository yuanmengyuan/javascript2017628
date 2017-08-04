var utils=(function () {
    return {
        makeArray:function (arg) {
            try{
                return Array.prototype.slice.call(arg)
            }catch (e){
                var ary=[];
                for(var i=0; i<arg.length; i++){
                    ary.push(arg[i]);
                }
                return ary;
            }
        },
        jsonParse:function (jsonStr) {
            return 'JSON' in window ? JSON.parse(jsonStr):eval('('+jsonStr+')');
        }

    }
})();