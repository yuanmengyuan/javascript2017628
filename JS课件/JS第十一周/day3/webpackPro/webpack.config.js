const path=require('path');
module.exports={
    devtool:'eval-source-map',
    //设置入口文件
    entry:path.resolve(__dirname,'app/main.js'),
    output:{//设置出口文件
        path:path.resolve(__dirname,'public'),
        filename: "bundle.js"
    },
    devServer: {
        contentBase:'./public',
        inline:true
    }
}