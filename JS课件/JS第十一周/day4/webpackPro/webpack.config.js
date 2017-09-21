const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('[name]-[contenthash].css?');
module.exports={
    entry:'./app/main.js',//入口文件
    output:{//出口文件
        path:path.resolve(__dirname,'./public'),
        filename:'bundle.js'
    },
    devServer: {
        contentBase:path.resolve(__dirname,'./public'),
        historyApiFallback:true,
        inline:true
    },
    module:{
        rules: [
            {
                test:/(\.js|\.jsx)$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test: /\.less$/i,
                use: extractLESS.extract({
                    fallback:"style-loader",
                    use:[{
                        loader:'css-loader',
                        options:{
                            modules:true
                        }
                    },{
                        loader:'less-loader'
                    },{
                        loader:'postcss-loader'
                    }]
                })
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./app/index.html'),
            title:'this is a webpack-test'
        }),
        extractLESS
    ]
};