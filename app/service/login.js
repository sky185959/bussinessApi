'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  // 根据用户名和密码登录
  async login(username, password) {
    const result = await this.app.mysql.get('shopdb').get('tb_users', { username, password });
    if (username === 'admin') {
      return {
        role: [ 'admin' ],
        name: 'admin',
        data: result,
        introduction: '我是超级管理员',
        token: 'admin',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      };
    }
  }
  // 用户根据用户名登录接口
  async LoginByName(username, password) {
    const result = await this.app.mysql.get('shopdb').get('tb_users', { username, password });
    return {
      error_code: result ? 0 : 1,
      data: result,
    };
  }
  // 用户根据邮箱登录
  async LoginByEmail(email, password) {
    const result = await this.app.mysql.get('shopdb').get('tb_users', { email, password });
    return {
      error_code: result ? 0 : 1,
      data: result,
    };
  }
  // 用户根据手机号码登录
  async LoginByPhone(phone, password) {
    const result = await this.app.mysql.get('shopdb').get('tb_users', { phone, password });
    return {
      error_code: result ? 0 : 1,
      data: result,
    };
  }
  // 发送验证码
  async sendCode(phone) {
    // 判断是否保存过验证码
    const isHaveCode = await this.app.mysql.get('shopdb').get('yzm', { id: phone });
    const currenttime = new Date().getTime();
    // 判断是新增还是修改的
    let isAdd = true;
    // 如果不存在就直接发送验证码，存在根据时间判断，10分钟之内有效
    if (isHaveCode) {
      console.log(isHaveCode);
      const addtime = isHaveCode.addtime;
      const mins = Math.abs(currenttime - addtime) / 1000 / 60;
      if (mins < 10) {
        return { error_code: 0, msg: '验证码10分钟之内有效，请勿重新获取', phone, code: isHaveCode.yzm };
      }
      isAdd = false;
    }

    const url = 'https://api.mysubmail.com/message/xsend';
    const code = Math.round(Math.random() * 1000000);
    // 请求的参数
    const params = {
      appid: '16292',
      to: phone,
      vars: { code },
      project: 'MXqfD3',
      signature: 'a37b0dcabcfdb03552647f2b266c49b4',
    };
    // 请求的配置项
    const option = {
      method: 'post',
      data: params,
      dataType: 'json',
      contentType: 'json',
    };

    const result = await this.ctx.curl(url, option);
    if (result.status === 200) {
      // 短信发送成功以后保存在数据库中
      const data = {
        id: phone,
        yzm: code,
        type: 1,
        addtime: new Date().getTime(),
      };
      // 判断是新增验证码还是修改验证码的操作
      let res = null;
      if (isAdd) {
        res = await this.app.mysql.get('shopdb').insert('yzm', data);
      } else {
        res = await this.app.mysql.get('shopdb').update('yzm', data);
      }
      // 判断结果
      if (res.affectedRows > 0) {
        return { error_code: 0, msg: '获取验证码成功,10分钟之内有效，请勿重新获取', phone, code };
      }
      return { error_code: 1, msg: '获取验证码失败', phone };
    }
    return { error_code: 1, msg: '获取验证码失败', phone };
  }
  // 根据邮箱注册用户
  async regWithEmail(data) {
    const { ctx, app } = this;
    data.createtime = ctx.helper.currentDateTime();
    const result = await app.mysql.get('shopdb').insert('tb_users', data);
    return {
      insertId: result.insertId, // 添加返回的ID
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '注册成功' : '注册失败',
    };
  }
  // 手机号码注册用户
  async regWithPhone(data) {
    const { ctx, app } = this;
    data.createtime = ctx.helper.currentDateTime();
    const result = await app.mysql.get('shopdb').insert('tb_users', data);
    return {
      insertId: result.insertId, // 添加返回的ID
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '注册成功' : '注册失败',
    };
  }
  // 注册用户
  async regUser(data) {
    const { ctx, app } = this;
    data.createtime = ctx.helper.currentDateTime();
    const result = await app.mysql.get('shopdb').insert('tb_users', data);
    return {
      insertId: result.insertId, // 添加返回的ID
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '注册成功' : '注册失败',
    };
  }
  // 根据手机号码设置新密码
  async changePassword(data) {
    const sql = ' update tb_users set password = ? where phone = ? ';
    const result = await this.app.mysql.get('shopdb').query(sql, [ data.password, data.phone ]);
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '修改密码成功' : '修改密码失败',
    };
  }
  // 判断用户手机号码是否存在
  async isHaveUserPhone(phone) {
    const result = await this.app.mysql.get('shopdb').get('tb_users', { phone });
    return result;
  }
  // 判断用户邮箱是否存在
  async isHaveUserEmail(email) {
    const result = await this.app.mysql.get('shopdb').get('tb_users', { email });
    return result;
  }
  // 判断用户名是否存在
  async isHaveUserName(username) {
    const result = await this.app.mysql.get('shopdb').get('tb_users', { username });
    return result;
  }
}

module.exports = LoginService;
