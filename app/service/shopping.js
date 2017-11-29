'use strict';

const Service = require('egg').Service;

class ShoppingService extends Service {
  // 根据用户名和密码登录
  async list() {
    const result = await this.app.mysql.get('shopdb').select('shopping');
    return { list: result };
  }

  async add() {
    const result = await this.app.mysql.get('shopdb').get('shopping');
    return { list: result };
  }
}

module.exports = ShoppingService;
