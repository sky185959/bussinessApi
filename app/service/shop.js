'use strict';

const Service = require('egg').Service;

class ShopService extends Service {
  // 根据用户名和密码登录
  async list() {
    const result = await this.app.mysql.get('shopdb').select('shop');
    return { list: result };
  }
}

module.exports = ShopService;
