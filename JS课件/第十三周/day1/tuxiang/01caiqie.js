const gm=require('gm');
const fs=require('fs');

/*
gm('./img/a.jpg')
    .resizeExact(200,200)
    .write('./lei/01.jpg',err=>{
        if(!err) console.log('done');
    });*/
gm('./img/a.jpg')
    .crop(154,176,420,335)
    .blur(7, 3)
    .write('./lei/02.jpg',err=>{
        if(!err) console.log('done');
    });