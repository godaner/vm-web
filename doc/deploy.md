# 部署到静态服务器
    * 进入linux 
    * 安装npm
        yum install npm
        
    * 安装依赖安装在dist文件内部
        使用npm
            npm install -g forever
            npm install express body-parser ejs path  compression --save
                
        或者使用yarn(推荐)
            yarn global add forever
            yarn add express body-parser ejs path  compression
    *运行服务器
        
        启动：
            forever start server.vm_config.js 自动后台运行
        停止：
            forever stop server.vm_config.js
    