'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
	
  // 根据用户名和密码登录
  async list(page, pageSize,order_no=null,user_id=null) {
  	const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;
    const where = {};
    if(user_id){
      where.user_id=user_id
    }
    if(order_no){
      where.order_no=order_no
    }
    //SELECT `id`, `order_no`, `price_cu`, `create_time`, `sent_time`, `addr_id`, `count`, `status`, `pay_time`, `is_delete` FROM `tb_order` limit 0,10
    const listArr =  await this.app.mysql.select("tb_order",{
      where,
    	limit,
    	offset,
      orders:[["create_time",'desc']],
    });
   
    if(listArr){
       for( let item in listArr){
         let info = await this.getOrderInfo(listArr[item].order_no);
         listArr[item].order_info = info;

       }
    }

    return { data: listArr }
  }

  async getOrderInfo(order_no){
    const orderListInfo = await this.app.mysql.select("tb_orderinfo",{
      where:{order_no},
      orders:[["create_time",'desc']],
    });
    return orderListInfo;
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

  //状态修改
  async update(data){
    const { ctx, app } = this;
    const currenttime = ctx.helper.currentDateTime();

    switch(data.status){
      case 1:
        data.pay_time=currenttime;//已经付款
      break;
      case 2:
        data.sent_time=currenttime;//已经发货
      break;
      case 3:
        data.final_time=currenttime;//订单确认完成
      break;
    }
     
    const result = await app.mysql.update('tb_order', data);
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '修改成功' : '修改失败',
    };

  }


}

module.exports = OrderService;
