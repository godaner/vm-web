# 部署到静态服务器
    * 进入linux 
    * 安装npm
        yum install npm
    * 安装 cnpm: 
        cnpm install -g cnpm
    * 安装express服务器和server.config.js的依赖，一般安装在dist文件内部
        npm install express body-parser ejs path compression --save
    *运行服务器
        安装npm install -g forever，用于后台运行
        启动：
        xxx 正确：forever start server.config.js
        xxx 错误：nohup node server.config.js>express.out 2>&1 &（冒失关闭服务器的客户端ssh连接后将会停止express服务器）
        停止：
        forever stop server.config.js
    