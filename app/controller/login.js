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
  // 用户根据用户名、邮箱和手机号码登录接口
  async userLogin() {
    const { ctx, service } = this;
    const loginType = ctx.request.body.loginType;
    const data = {
      password: ctx.request.body.password,
    };
    // 验证登录类型
    const patternPhone = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    const patternEmail = /^\w +[@]\w +[.][\w.] +$/;
    if (patternPhone.test(loginType)) {
      data.phone = loginType;
    } else if (patternEmail.test(loginType)) {
      data.email = loginType;
    } else {
      data.username = loginType;
    }
    const result = await service.login.login(data);
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
  // 手机号码注册用户
  async regWithPhone() {
    const { ctx, service } = this;
    const result = await service.login.regWithPhone(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
  // 邮箱注册用户
  async regWithEmail() {
    const { ctx, service } = this;
    const result = await service.login.regWithEmail(ctx.request.body);
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
