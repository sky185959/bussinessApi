'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = LoginController;
