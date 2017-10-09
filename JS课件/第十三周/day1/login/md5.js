const crypto=require('crypto');
function md5(mima) {
    let hash=crypto.createHash('md5');
    return hash.update(mima).digest('base64');
}

let mima=md5(md5('123')+md5('123').substr(4,11)+'lei');