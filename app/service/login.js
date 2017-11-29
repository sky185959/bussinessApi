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
}

module.exports = LoginService;
