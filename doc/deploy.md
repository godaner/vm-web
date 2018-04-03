# 部署到静态服务器
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
        nohup serve -p 3999 dist>serve.out 2>&1 &(或者build)
    