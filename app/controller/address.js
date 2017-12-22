'use strict';
//地址管理
const Controller = require('egg').Controller;

class AddressController extends Controller {

	//根据玩家id获取地址列表
	async list(){
		const { ctx, service } = this;
		const userid = ctx.request.query.userid;//用户ID
		const result = await service.address.list(userid);
	    ctx.body = result;
	    ctx.status = 200;
	}
		//订单创建
	async add(){
		const { ctx, service } = this;
	    const resultList = await service.address.add(ctx.request.body);
	    ctx.body = {resultList};
	    ctx.status = 200;
	}
	
	async update(){
		const { ctx, service } = this;
	    const resultList = await service.address.update(ctx.request.body);
	    ctx.body = {resultList};
	    ctx.status = 200;
	}

}
module.exports = AddressController