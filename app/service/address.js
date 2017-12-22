'use strict';

//地址管理
const Service = require('egg').Service;

class AddressService extends Service {

	async list(user_id) {
		
	    const result = await this.app.mysql.select('tb_address', {
	    	where:{user_id},
	      	orders: [[ 'id', 'desc' ]], // 排序方式
	      	limit:6
	    });
	    return { data: result };
  	}

  	//新增地址
  	async add(data) {
	    const result = await this.app.mysql.insert('tb_address', data);
	    return {
	      insertId: result.insertId, // 添加返回的ID
	      error_code: result.affectedRows > 0 ? 0 : 1,
	      msg: result.affectedRows > 0 ? '添加成功' : '添加失败',
	    };
  	}
  	//地址修改
  	async update(data){

  		const { ctx, app } = this;
	    const currenttime = ctx.helper.currentDateTime();
	    const result = await app.mysql.update('tb_address', data);
	    return {
	      error_code: result.affectedRows > 0 ? 0 : 1,
	      msg: result.affectedRows > 0 ? '修改成功' : '修改失败',
	    };
  	}

}

module.exports = AddressService;