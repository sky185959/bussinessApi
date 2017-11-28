'use strict';

// 路由
module.exports = app => {
  const { router, controller } = app;
  // 用户的路由信息
  router.get('/user/list', controller.user.list);
  router.get('/user/:id', controller.user.find);
  router.post('/user/add', controller.user.add);
  router.put('/user/update', controller.user.update);
  router.delete('/user/delete', controller.user.destroy);
};
