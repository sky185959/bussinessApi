'use strict';

const Controller = require("egg").Controller;

class ShoppingController extends Controller{
	async list(){
		const {ctx, service}  = this;
		const result = await service.shopping.list();
		ctx.body = result;
    	ctx.status = 200;
	}
}
module.exports = ShoppingController;