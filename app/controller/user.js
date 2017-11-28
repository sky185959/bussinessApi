'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async list() {
    // ctx, service属性挂在 this
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const result = await service.user.list();
    // 设置响应内容和响应状态码
    ctx.body = result;
    ctx.status = 200;
  }

  async find() {
    const { ctx, service } = this;
    const Id = ctx.params.id;
    const result = await service.user.find(Id);
    ctx.body = result;
    ctx.status = 200;
  }

  async add() {
    const { ctx, service } = this;
    const Id = ctx.params.id;
    const result = await service.user.add(Id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const { ctx, service } = this;
    const Id = ctx.params.id;
    const result = await service.user.update(Id);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const { ctx, service } = this;
    const Id = ctx.params.id;
    const result = await service.user.delete(Id);
    ctx.body = result;
    ctx.status = 200;
  }

}

module.exports = UserController;
