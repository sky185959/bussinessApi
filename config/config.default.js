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
    // 单实例数据库配置
    client: {
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
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };


  // 开启语言配置为中文
  config.i18n = {
    // 默认语言，默认 "en_US"
    defaultLocale: 'zh-CN',
    // URL 参数，默认 "locale"
    queryField: 'locale',
    // Cookie 记录的 key, 默认："locale"
    cookieField: 'locale',
    // Cookie 默认 `1y` 一年后过期， 如果设置为 Number，则单位为 ms
    cookieMaxAge: '1y',
  };

  // 配置文件上传的路劲
  config.uploadPath = {
    imgUpload: '/public/imgUpload', // 图片上传的路径
    officeUpload: '/public/officeUpload', // office文件上传的路径
    otherUpload: '/public/otherUpload', // 其他文件上传的路径
  };

  // 上传文件配置
  config.multipart = {
    fileSize: '50mb', // 上传文件的大小
    // 文件后缀名添加白名单
    fileExtensions: [
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.txt',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
    ],
  };

  return config;
};
