{//let和const
    const aBtn=document.getElementsByTagName('button');
    for(let i=0; i<aBtn.length; i++){
        aBtn[i].onclick=function(){
            alert(i);
        }
    }
    //aBtn='hello';
    console.log(aBtn);
}