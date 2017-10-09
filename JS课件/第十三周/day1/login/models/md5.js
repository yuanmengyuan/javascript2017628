const crypto=require('crypto');
module.exports=function (mima) {
    let hash=crypto.createHash('md5');
    return hash.update(mima).digest('base64');
};