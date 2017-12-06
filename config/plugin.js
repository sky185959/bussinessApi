'use strict';

// had enabled by egg
// exports.static = true;

// 模板引擎插件
exports.nunjucks = {
  enabled: true,
  package: 'egg-view-nunjucks',
};

// mysql数据库插件
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

// 跨域访问的插件
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// 参数校验插件
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// 开启国际化状态
exports.i18n = {
  enable: true,
  package: 'egg-i18n',
};
