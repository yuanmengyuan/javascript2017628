const data=require('./data.json');
module.exports=()=>{
    let h1=document.createElement('h1');
    h1.innerHTML=data.greetText;
    return h1;
};
