'use strict';

// 路由
module.exports = app => {
  const { router, controller } = app;
  // 登录接口
  router.post('/login/login', controller.login.login);

  // 用户的路由信息
  router.get('/user/list', controller.user.list);
  router.get('/user/:userId', controller.user.find);
  router.post('/user/add', controller.user.add);
  router.put('/user/update', controller.user.update);
  router.delete('/user/delete', controller.user.destroy);
};