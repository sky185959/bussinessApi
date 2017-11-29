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
}

module.exports = LoginController;
