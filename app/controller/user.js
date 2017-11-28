'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async show() {
    this.ctx.body = { id: 100, name: 'tom' };
  }

  async update() {
    const { ctx } = this;
    console.log('llll:' + ctx.request.bod);
    this.ctx.body = { id: 100, name: 'tom' };
    ctx.status = 204;
  }
}

module.exports = UserController;
