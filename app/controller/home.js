'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('index');
  }

  async demo() {
    await this.ctx.render('demo');
  }
}

module.exports = HomeController;
