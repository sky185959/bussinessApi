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

  // 分页获取数据
  async getListByPage(page, pageSize) {
    const result = await this.app.mysql.get('shopdb').select('shopping', {
      orders: [[ 'create_time', 'desc' ]], // 排序方式
      limit: parseInt(pageSize), // 返回数据量
      offset: (page - 1) * pageSize, // 数据偏移量
    });
    return { count: pageSize, msg: '', code: '', data: result };
  }
  
  async getShoppingListByShop(spid) {
    const result = await this.app.mysql.get('shopdb').select('shopping',{
    	where:{shop_id:spid}
    });

    return { count: result.length, msg: '', code: '', data: result };
  }
  
   async getShoppingListBySaleTy(saleid) {
	    const result = await this.app.mysql.get('shopdb').select('shopping',{
	    	where:{sale_ty:saleid}
	    });

	    return { count: result.length, msg: '', code: '', data: result };
	}
}

module.exports = ShoppingService;
