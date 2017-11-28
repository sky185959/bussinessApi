'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async list() {
    // ctx, service属性挂在 this
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const result = await service.user.getList();
    // 设置响应内容和响应状态码
    ctx.body = result;
    ctx.status = 200;
  }

  async getListWithPage() {
    const { ctx, service } = this;
    const page = ctx.params.page;
    const limit = ctx.params.limit;
    const result = await service.user.getListWithPage(page, limit);
    ctx.body = result;
    ctx.status = 200;
  }

  async find() {
    const { ctx, service } = this;
    const userId = ctx.params.userId;
    const result = await service.user.findByID(userId);
    ctx.body = result;
    ctx.status = 200;
  }

  async add() {
    const { ctx, service } = this;
    const result = await service.user.addModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const { ctx, service } = this;
    const result = await service.user.updateModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const { ctx, service } = this;
    const userId = ctx.request.body.userId;
    const result = await service.user.destroyModel(userId);
    ctx.body = result;
    ctx.status = 200;
  }

}

module.exports = UserController;
