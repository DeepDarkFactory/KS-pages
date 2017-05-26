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
        })
    ],
    resolve: {
        //简写扩展名
        extensions: [" ", ".js", ".vue"],
    },


}


