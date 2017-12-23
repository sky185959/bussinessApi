'use strict';

//地址管理
const Service = require('egg').Service;

class BuycarService extends Service {

	//获取购物车列表
	async fetch(user_id) {
		
	    const sql = "select c.id,c.user_id,i.id,i.shopping_id,i.count,s.goodsname,s.price,s.pic0 from tb_car c left join tb_carinfo i on c.id=i.car_id left join tb_goods s on i.shopping_id=s.id where c.user_id="+user_id+"  order by c.id desc";
	    const result = await this.app.mysql.query(sql);
	    return { data: result };
  	}

  	//加入购物车
  	async add(data){
  		const carData = {
  			user_id:data.user_id,
  		}
  		const carRs = await this.app.mysql.insert("tb_car",carData);
  		const carInfoData = {
  			car_id:carRs.insertId,
  			shopping_id:data.shopping_id,
  			count:data.count,
  			shopping_name:data.shopping_name,
  			shopping_price:data.shopping_price,
  		}
  		const result = await this.app.mysql.insert("tb_carinfo",carInfoData);

  		return {
	      insertId: result.insertId, // 添加返回的ID
	      error_code: result.affectedRows > 0 ? 0 : 1,
	      msg: result.affectedRows > 0 ? '添加成功' : '添加失败',
	    };

  	}



}

module.exports = BuycarService;