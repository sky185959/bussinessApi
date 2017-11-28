'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async login() {
    const user = await this.app.mysql.get('shopdb').query('select * from authenticity ');
    return user;
  }
}

module.exports = LoginService;
