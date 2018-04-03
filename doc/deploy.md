# express 服务器安装
    * 进入linux 
    * 安装npm
        yum install npm
    * 安装 cnpm: 
        cnpm install -g cnpm
    * 安装npm server！！！注意是serve不是server
        npm install -g serve
        获取安装后的serve路径：/usr/lib/node_modules/serve/bin/serve.js
    * 添加server到环境变量
        export PATH=/usr/lib/node_modules/serve/bin:$PATH
    *运行服务器
        serve dist(或者build)
    