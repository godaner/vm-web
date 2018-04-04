# 部署到静态服务器
    * 进入linux 
    * 安装npm
        yum install npm
    * 安装 cnpm: 
        cnpm install -g cnpm
    * 安装express服务器和server.config.js的依赖，一般安装在dist文件内部
        npm install express body-parser ejs path compression --save
    *运行服务器
        nohup node server.config.js>express.out 2>&1 &(或者build)
    