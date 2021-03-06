


// 引入模块
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const compression = require('compression');
var app = express();

// 启用gzip
app.use(compression());
//
// 对所有(/)URL或路由返回index.html
app.get('/', function (req, res) {
    res.render('index');
});

// 设置views路径和模板
app.set('views', './');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// 静态文件配置
app.use('/', express.static(path.join(__dirname, './')));

// 启动一个服务，监听进入的所有连接请求
var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});