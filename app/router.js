'use strict';

// 路由
module.exports = app => {
  const { router, controller } = app;
  app.get('/', app.controller.home.index);
  app.get('/demo', app.controller.home.demo);
  // 登录接口
  router.post('/login/login', controller.login.login);
  // 根据手机号发送验证码
  router.post('/login/sendCode', controller.login.sendCode);
  // 注册用户
  router.post('/login/register', controller.login.regUser);

  // 用户的路由信息
  router.get('/user/list', controller.user.list);
  router.get('/user/info', controller.user.userInfo);
  router.get('/user/listByPage', controller.user.getListWithPage);
  router.get('/user/getUserById', controller.user.find);
  router.post('/user/add', controller.user.add);
  router.put('/user/update', controller.user.update);
  router.delete('/user/delete', controller.user.destroy);
  router.get('/shop/list', controller.shop.list);
  router.get('/shopping/list', controller.shopping.list);
};
