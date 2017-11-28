'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1511526645430_496';

  // add your config here
  config.middleware = [];

  // nunjucks视图插件
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // 安全配置
  config.security = {
    // csrf: {
    //   ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    //   useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
    //   cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
    //   sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
    //   headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    // },
    csrf: false, // 关闭csrf
    // ctoken: false,
    // 白名单
    // domainWhiteList: [ 'http://localhost:3000' ],
  };

  // 跨域请求配置
  config.cors = {
    origin: '*', // 星号代表允许所有的请求源
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 允许的请求方式
    credentials: true,
  };

  // 数据库的配置
  config.mysql = {
    clients: {
      //  获取client实例，需要通过 app.mysql.get('db1') 获取
      shopdb: {
        // host
        host: '118.190.206.71',
        // 端口号
        port: '3306',
        // 用户名
        user: 'shop',
        // 密码
        password: 'shop',
        // 数据库名
        database: 'shop',
      },
    },
    // 所有数据库配置的默认值
    default: {},
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return config;
};
