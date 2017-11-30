'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx, service } = this;
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const result = await service.login.login(username, password);
    ctx.body = result;
    ctx.status = 200;
  }
  // 发送验证码
  async sendCode() {
    const { ctx, service } = this;
    const phone = ctx.request.body.phone;
    const result = await service.login.sendCode(phone);
    ctx.body = result;
    ctx.status = 200;
  }
  // 注册用户
  async regUser() {
    const { ctx, service } = this;
    const result = await service.login.regUser(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = LoginController;
