'use strict';

const Service = require('egg').Service;

class ShopService extends Service {
  // 根据用户名和密码登录
  async list() {
    const result = await this.app.mysql.get('shopdb').select('shop');
    return { list: result };
  }

   async findByID(shopid) { 
    const result = await this.app.mysql.get('shopdb').get('shop', { id: shopid });
    return { data: result };
  }

  // 分页获取数据
  async getListByPage(page, pageSize) {
    const result = await this.app.mysql.get('shopdb').select('shop', {
      orders: [[ 'id', 'desc' ]], // 排序方式
      limit: parseInt(pageSize), // 返回数据量
      offset: (page - 1) * pageSize, // 数据偏移量
    });
    return { count: pageSize, msg: '', code: '', data: result };
  }

  async getShopListByUser(uid) {
    const result = await this.app.mysql.get('shopdb').select('shop',{
    	where:{user_id:uid}
    });

    return { count: result.length, msg: '', code: '', data: result };
  }

}

module.exports = ShopService;
