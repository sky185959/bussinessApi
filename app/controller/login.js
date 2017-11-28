'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx, service } = this;
    const username = ctx.request.body.username;
    const userpwd = ctx.request.body.userpwd;
    const result = await service.login.login(username, userpwd);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = LoginController;
