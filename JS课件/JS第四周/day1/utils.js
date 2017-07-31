var utils=(function () {
    return {
        /**
         * 功能：类数组转数组；
         * @param arg {参数是类数组}
         * @returns {Array}
         */
        makeArray:function (arg) {
            var ary=[];
            try{//标准浏览器；
                ary=Array.prototype.slice.call(arg);
            }catch (e){
                //浏览器不支持的时候，使用遍历；
                for(var i=0; i<arg.length; i++){
                    ary.push(arg[i])
                }
            }
            return ary;
        },
        /**
         *
         * @param jsonStr
         */
        jsonParse:function (jsonStr) {
            return 'JSON' in window? JSON.parse(jsonStr): eval('('+jsonStr+')');
        }
    }
})();














