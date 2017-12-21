'use strict';
const Controller = require("egg").Controller;

//订单相关
class OrderController extends Controller{

	//订单列表
	async list(){
		const {ctx, service}  = this;
		const page = ctx.request.query.page;//开始页数
    	const limit = ctx.request.query.limit;//查询记录数
    	const orderNo = ctx.request.query.order;//订单号
    	const user_id = ctx.request.query.user_id;//订单号
		const result = await service.order.list(page,limit,orderNo,user_id);
		ctx.body = result;
    	ctx.status = 200;
	}

	//订单创建
	async add(){
		const { ctx, service } = this;
	    const resultList = await service.order.addlist(ctx.request.query);
	    ctx.body = {resultList};
	    ctx.status = 200;
	}
}
module.exports = OrderController