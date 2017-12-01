'use strict';

const Controller = require("egg").Controller;
class ShoppingController extends Controller{
	async list(){
		const {ctx, service}  = this;
		const result = await service.shopping.list();
		ctx.body = result;
    	ctx.status = 200;
	}

	async listByPage(){
		const {ctx, service}  = this;
	    let page = ctx.request.query.page;
	    const limit = ctx.request.query.limit;
	    if(page<1){
	    	page = 1;
	    }
		const result = await service.shopping.getListByPage(page, limit);
		ctx.body = result;
		ctx.status = 200;
	}

	async getShoppingListByShop(){
		const {ctx, service}  = this;
	    let spid = ctx.request.query.spid;
		const result = await service.shopping.getShoppingListByShop(spid);
		ctx.body = result;
		ctx.status = 200;
	}

	async getShoppingListBySaleTy(){
		const {ctx, service}  = this;
	    let spid = ctx.request.query.saleid;
		const result = await service.shopping.getShoppingListBySaleTy(saleid);
		ctx.body = result;
		ctx.status = 200;
	}
}
module.exports = ShoppingController;