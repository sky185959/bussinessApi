'use strict';

const Controller = require("egg").Controller;

class ShopController extends Controller{
	async list(){
		const {ctx, service}  = this;
		const result = await service.shop.list();
		ctx.body = result;
    	ctx.status = 200;
	}
}
module.exports = ShopController;