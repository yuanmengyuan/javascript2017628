define(()=>{
    let getTimeType=(date,type)=>{
        //距离下课还有多久：%的思想；
        let future=new Date('2017/9/20 13:00:00');
        let s=Math.floor((future-date)/1000);
        //60*60=86400
        let h=Math.floor(s/3600);
        s%=3600;
        let m=Math.floor(s/60);
        s%=60;
        if(type===1){
            return `${h}:${m}:${s}`
        }else if(type===2){
            return `${h}小时${m}分钟${s}秒`
        }
    };
    return {
        getTimeType
    }
});