'use strict';

// had enabled by egg
// exports.static = true;

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
