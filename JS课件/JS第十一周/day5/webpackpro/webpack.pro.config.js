const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
module.exports={
    entry:"./src/index.js",
    output: {
        path:path.resolve(__dirname,'./dist'),
        filename: "[name]-[hash].js"
    },
    module: {
        rules: [
            {
                test:/(\.jsx|\.js)$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/(\.css|\.less)$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                modules:true
                            }
                        },
                        {
                            loader:'less-loader'
                        },
                        {
                            loader:'postcss-loader'
                        }
                    ]
                })
            }
        ]
    },
    devServer: {
        contentBase:path.resolve(__dirname,'./dist'),
        inline:true
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'./src/index.html'),
            title:'hello!world!!'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name].css?[contenthash]')
    ]
};