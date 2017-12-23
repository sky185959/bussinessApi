'use strict';
//购物车管理
const Controller = require('egg').Controller;

class BuycarController extends Controller {

	//获取玩家购物车列表
	async fetch(){
		const { ctx, service } = this;
		const userid = ctx.request.query.userid;//用户ID
		const result = await service.buycar.fetch(userid);
	    ctx.body = result;
	    ctx.status = 200;
	}

	//加入购物车
	async add(){

		const { ctx, service } = this;
		const data = ctx.request.body;//用户ID
		const result = await service.buycar.add(data);
	    ctx.body = result;
	    ctx.status = 200;
	}
}
module.exports = BuycarController