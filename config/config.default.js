'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1511526645430_496';

  // add your config here
  config.middleware = [];

  // 数据库的配置
  config.mysql = {
    clients: {
      // db1, 获取client实例，需要通过 app.mysql.get('db1') 获取
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
      db2: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'ofo',
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
