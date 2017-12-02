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
    const result = await service.login.LoginByPhone(phone, password);
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
    const isHavePhone = await service.login.isHaveUserPhone(ctx.request.body.phone);
    if (isHavePhone) {
      ctx.body = { error_code: 1, msg: '该手机号已注册' };
    } else {
      const result = await service.login.regWithPhone(ctx.request.body);
      ctx.body = result;
    }
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
    const isHaveEmail = await service.login.isHaveUserEmail(ctx.request.body.email);
    if (isHaveEmail) {
      ctx.body = { error_code: 1, msg: '该邮箱已注册' };
    } else {
      const result = await service.login.regWithEmail(ctx.request.body);
      ctx.body = result;
    }
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
    const isHaveName = await service.login.isHaveUserName(ctx.request.body.username);
    if (isHaveName) {
      ctx.body = { error_code: 1, msg: '该用户名称已注册' };
    } else {
      const result = await service.login.regUser(ctx.request.body);
      ctx.body = result;
    }
    ctx.status = 200;
  }
  // 根据手机号码找回密码
  async findPasswordByPhone() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      phone: { type: 'string', required: true, format: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/ },
    });
    const phone = ctx.request.body.phone;
    const isHavePhone = await service.login.isHaveUserPhone(phone);
    if (!isHavePhone) {
      ctx.body = { error_code: 1, msg: '该手机号未注册', phone };
    } else {
      const result = await service.login.sendCode(phone);
      ctx.body = result;
    }
    ctx.status = 200;
  }
  // 根据手机号码设置新密码
  async setPasswordWithPhone() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      phone: { type: 'string', required: true, format: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/ },
      password: { type: 'string', required: true, min: 6 },
    });
    const phone = ctx.request.body.phone;
    const isHavePhone = await service.login.isHaveUserPhone(phone);
    if (!isHavePhone) {
      ctx.body = { error_code: 1, msg: '该手机号未注册', phone };
    } else {
      const result = await service.login.changePassword(ctx.request.body);
      ctx.body = result;
    }
    ctx.status = 200;
  }
}

module.exports = LoginController;
