define(['a'],(cb)=>{
    function getTime(date) {
        return cb.getTimeType(date,2)
    }
    return{
        getTime
    }
});