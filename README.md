# bussinessApi



## 快速入门

<!-- add docs here for user -->

该接口是基于egg框架编写的API接口，更多详情浏览 [egg docs][egg].

### 本地开发

# 该项目是基于node版本8.9以上可以正常运行，请更新node版本到8.9以上即可

```bash
# 克隆项目
$ git clone https://github.com/sky185959/bussinessApi.git
# 安装依赖，由于网络问题，建议用淘宝镜像安装较快(npm install --registry=https://registry.npm.taobao.org)
$ npm install
$ npm run dev
$ open http://localhost:7001/
```
### Mysql数据库配置

在config文件中config.default.js中的mysql可以中配置

### 目录结构

```shell
├── logs                       // 日志文件
├── config                     // 配置相关
├── app                        // 源代码
│   ├── controller             // 控制器
│   ├── public                 // 主题 字体等静态资源
│   ├── service                // 服务
│   ├── views                  // 视图文件夹
│   ├── router                 // 路由
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
└── package.json               // package.json


[egg]: https://eggjs.org