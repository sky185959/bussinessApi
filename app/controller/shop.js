'use strict';

const Controller = require("egg").Controller;

class ShopController extends Controller{
	async list(){
		const {ctx, service}  = this;
		const result = await service.shop.list();
		ctx.body = result;
    	ctx.status = 200;
	}

	async getById(){
		const {ctx, service}  = this;
		const id = ctx.request.body.shopid
		const result = await service.shop.findByID(id);
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
		const result = await service.shop.getListByPage(page, limit);
		ctx.body = JSON.stringify(result);
		ctx.status = 200;
	}

	async getShopListByUser(){
		const {ctx, service}  = this;
	    let uid = ctx.request.query.uid;
		const result = await service.shop.getShopListByUser(uid);
		ctx.body = "AA"+JSON.stringify(result);
		ctx.status = 200;
	}

	// async getIdList(){
	// 	const {ctx, service}  = this;
	// 	const page = ctx.request.query.page;
	// 	const limit = ctx.request.query.limit;
	// 	const result = await service.shop.getListWithPage(page, limit);
	// 	ctx.body = result;
	// 	ctx.status = 200;
	// }
}
module.exports = ShopController;