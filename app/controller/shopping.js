'use strict';

const Controller = require('egg').Controller;

class ShoppingController extends Controller {
  async list() {
    const { ctx, service } = this;
    const result = await service.shopping.list();
    ctx.body = result;
    ctx.status = 200;
  }

  async listByPage() {
    const { ctx, service } = this;
    // 验证提交的参数
    // ctx.validate({
    //   page: { type: 'int', required: true },
    //   limit: { type: 'int', required: true },
    // });
    const page = ctx.request.query.page;
    const limit = ctx.request.query.limit;
    const goodsname = ctx.request.query.goodsname;
    const result = await service.shopping.getListByPage(page, limit, goodsname);
    ctx.body = result;
    ctx.status = 200;
  }

  async add() {
    const { ctx, service } = this;
    // 验证提交的参数
    // ctx.validate({
    //   goodsname: { type: 'string', required: true },
    //   price: { type: 'string', required: true },
    //   stock: { type: 'int', required: true },
    //   sale_ty: { type: 'int', required: true },
    //   status: { type: 'int', required: true },
    // });
    const result = await service.shopping.addModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const { ctx, service } = this;
    // 验证提交的参数
    // ctx.validate({
    //   id: { type: 'int', required: true },
    //   goodsname: { type: 'string', required: true },
    //   price: { type: 'string', required: true },
    //   stock: { type: 'int', required: true },
    //   sale_ty: { type: 'int', required: true },
    //   status: { type: 'int', required: true },
    // });
    const result = await service.shopping.updateModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.request.body.id;
    const result = await service.shopping.destroyModel(id);
    ctx.body = result;
    ctx.status = 200;
  }

  async getShoppingListByShop() {
    const { ctx, service } = this;
    const spid = ctx.request.query.spid;
    const result = await service.shopping.getShoppingListByShop(spid);
    ctx.body = result;
    ctx.status = 200;
  }

  async getShoppingListBySaleTy() {
    const { ctx, service } = this;
    const spid = ctx.request.query.saleid;
    const result = await service.shopping.getShoppingListBySaleTy(spid);
    ctx.body = result;
    ctx.status = 200;
  }
}
module.exports = ShoppingController;