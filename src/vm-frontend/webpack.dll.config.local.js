const webpack = require("webpack")
const library = '[name]_lib'
const path = require("path")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const env = "localhost";
module.exports = {//只能分离node_moudle下的依赖，无法分离与cdn相关依赖
    entry: {
        vendors:  [
            /** 请十分注意，这里不能依赖externals的选项 **/
            'react',
            'react-dom',
            // 'echarts',
            // 'antd',
            "react-router",
            "react-router-dom"
            // "node-sass"
            // "events"
        ]
    },

    output: {
        filename: "[name].dll.js",
        path: __dirname+"/dist/",
        library
    },
    plugins: [
        //编译环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env),
            }
        }),

        //去除错误
        // new webpack.NoErrorsPlugin(),
        // 将代码中有重复的依赖包去重
        new webpack.optimize.DedupePlugin(),
        // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),
        //代码混淆
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
                pure_funcs: ['c'],
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            },
            sourceMap: false
        }),
        //dll
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist/[name]-manifest.json"),
            name: library
        })
        //gzip 压缩,使用了express的gzip
        // new CompressionPlugin({
        //     asset: '[path].gz[query]',   // 目标文件名
        //     algorithm: 'gzip',   // 使用gzip压缩
        //     test: new RegExp(
        //         '\\.(js|css)$'    // 压缩 js 与 css
        //     ),
        //     threshold: 10240,   // 资源文件大于10240B=10kB时会被压缩
        //     minRatio: 1  // 最小压缩比达到0.8时才会被压缩
        // }),
    ]
}

console.log("====>> webpack.dll.config env is : "+env+" <<====");