'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  // 根据用户名和密码登录
  async login(username, password) {
    const result = await this.app.mysql.get('shopdb').get('tb_users', { username, password });
    return { error_code: result ? 0 : 1, data: result, token:'12394795hf7g' };
  }
}

module.exports = LoginService;
