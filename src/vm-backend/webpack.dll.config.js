const webpack = require("webpack")
const library = '[name]_lib'
const path = require("path")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
    entry: {
        vendors: ["react","antd"]
    },
    output: {
        filename: "[name].dll.js",
        path: __dirname+"/dist/",
        library
    },
    plugins: [

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist/[name]-manifest.json"),
            name: library
        })
    ]
}
console.log("==>> webpack.dll.config.js#process.env.NODE_ENV is : "+ process.env.NODE_ENV)