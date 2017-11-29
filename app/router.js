'use strict';

// 路由
module.exports = app => {
  const { router, controller } = app;
  app.get('/', app.controller.home.index);
  app.get('/demo', app.controller.home.demo);
  // 登录接口
  router.post('/login/login', controller.login.login);

  // 用户的路由信息
  router.get('/user/list', controller.user.list);
  router.get('/user/info', controller.user.userInfo);
  router.get('/user/listByPage', controller.user.getListWithPage);
  router.get('/user/getUserById', controller.user.find);
  router.post('/user/add', controller.user.add);
  router.post('/user/update', controller.user.update);
  router.post('/user/delete', controller.user.destroy);
};
