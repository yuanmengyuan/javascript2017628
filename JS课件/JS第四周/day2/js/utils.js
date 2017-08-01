var utils=(function () {
    return {
        /**
         * 功能：类数组转数组
         * @param arg  {类数组}
         * @returns {Array}
         */
        makeArray:function (arg) {
            var ary=[];
            try {
                ary=Array.prototype.slice.call(arg);
            }catch (e){
                for(var i=0; i<arg.length; i++){
                    ary.push(arg[i]);
                }
            }
            return ary;
        },
        /**
         * 功能：把JSON格式的字符串，转成JSON格式的数据（对象）
         * @param jsonStr
         * @returns {Object}
         */
        jsonParse:function (jsonStr) {
            return "JSON" in window? JSON.parse(jsonStr):eval('('+jsonStr+')')
        }
    }
})();