//07:defineProperty()
let oTxt=document.getElementById('txt');
let oDiv=document.getElementById('div');
let obj={};
Object.defineProperty(obj,'a',{
    get(){
        console.log('get init');
    },
    set(newAry){
        console.log('set init');
        oDiv.innerHTML=newAry;
        oTxt.value=newAry;
    }
});
oTxt.addEventListener('keyup',function(){
    //改数据
    obj.a=this.value;
});
obj.a='334555';
