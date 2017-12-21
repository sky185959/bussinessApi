'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
	
  // 根据用户名和密码登录
  async list(page, pageSize,order_no=null) {
  	const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;
    //SELECT `id`, `order_no`, `price_cu`, `create_time`, `sent_time`, `addr_id`, `count`, `status`, `pay_time`, `is_delete` FROM `tb_order` limit 0,10
    const listArr = await await this.app.mysql.select("tb_order",{
    	orders:[["create_time",'desc']],
    	order_no,
    	limit,
    	offset
    });
    return { data: listArr }
  }

  async addlist(list){
    //SELECT `id`, `order_no`, `user_id`, `username`, `price_cu`, `create_time`, `sent_time`, `addr_id`, `count`, `status`, `pay_time`, `is_delete` FROM `tb_order` WHERE 1
    const order_no = (new Date()).getTime();
    const insertData = {
      order_no:order_no,
      user_id:list.user_id,
      username:list.username,
      price_cu:list.price_cu,
      addr_id:list.addr_id,
    }
    const resultData = await this.app.mysql.insert('tb_order', insertData);
  //  SELECT `id`, `order_no`, `shopping_id`, `shopping_count`, `shopping_name`, `price`, `create_time` FROM `tb_orderinfo` WHERE 1
    // list.orderInfo = [
    //   {shopping_id:1,shopping_name:"hello",price:"12.3",shopping_count:"1"},
    //   {shopping_id:2,shopping_name:"hello1",price:"12.3",shopping_count:"1"},
    //   {shopping_id:3,shopping_name:"hello2",price:"12.3",shopping_count:"1"},
    // ]
    
    if(list.orderInfo){
      for ( let item in list.orderInfo) {
          let insertDataInfo = {};
          item = list.orderInfo[item]
          insertDataInfo = {
            order_no:order_no,
            shopping_id:item.shopping_id,//商品标示
            shopping_name:item.shopping_name,//商品名称
            shopping_count:item.shopping_count,//商品名称
            price:item.price//计算后的总价
          }
        await this.app.mysql.insert('tb_orderinfo', insertDataInfo);
      }
    }
    return {
      insertId: resultData.insertId, // 添加返回的ID
      orderNo: order_no, // 添加返回的ID
      error_code: resultData.affectedRows > 0 ? 0 : 1,
      msg: resultData.affectedRows > 0 ? '添加成功' : '添加失败',
    };

  }


}

module.exports = OrderService;
