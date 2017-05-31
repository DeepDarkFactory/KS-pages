var path = require('path');
var webpack = require('webpack');
console.log(webpack.LoaderOptionsPlugin)

module.exports = {
    entry: {
        login: './index.js',
    },
    output: {
        filename: 'build/build.js', // '[name].[chunkhash].js'
    },
    module: {

        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,

        },
        {
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=8192'
        },
        {
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=8192'
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader'
        },
        ],
    },
    plugins: [

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({

        sourceMap: true,//这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
    })
    ],
    resolve: {
        //简写扩展名
        extensions: [" ", ".js", ".vue"],
    },


}


