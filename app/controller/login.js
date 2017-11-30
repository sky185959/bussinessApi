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
  // 用户根据用户名登录
  async LoginByName() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true, min: 6 },
    });
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const result = await service.login.LoginByName(username, password);
    ctx.body = result;
    ctx.status = 200;
  }
  // 根据邮箱登录
  async LoginByEmail() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      email: { type: 'email', required: true },
      password: { type: 'string', required: true, min: 6 },
    });
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    const result = await service.login.LoginByEmail(email, password);
    ctx.body = result;
    ctx.status = 200;
  }
  // 根据手机号登录
  async LoginByPhone() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      phone: { type: 'string', required: true, format: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/ },
      password: { type: 'string', required: true, min: 6 },
    });
    const phone = ctx.request.body.phone;
    const password = ctx.request.body.password;
    const result = await service.login.LoginByEmail(phone, password);
    ctx.body = result;
    ctx.status = 200;
  }
  // 发送验证码
  async sendCode() {
    const { ctx, service } = this;
    ctx.validate({
      phone: { type: 'string', required: true, format: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/ },
    });
    const phone = ctx.request.body.phone;
    const result = await service.login.sendCode(phone);
    ctx.body = result;
    ctx.status = 200;
  }
  // 手机号码注册用户
  async regWithPhone() {
    const { ctx, service } = this;
    ctx.validate({
      phone: { type: 'string', required: true, format: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/ },
      password: { type: 'string', required: true, min: 6 },
    });
    const result = await service.login.regWithPhone(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
  // 邮箱注册用户
  async regWithEmail() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      email: { type: 'email', required: true },
      password: { type: 'string', required: true, min: 6 },
    });
    const result = await service.login.regWithEmail(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
  // 注册用户
  async regUser() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true, min: 6 },
    });
    const result = await service.login.regUser(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = LoginController;
