'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  // 获取用户列表
  async list() {
    const result = await this.app.mysql.get('shopdb').select('authenticity');
    return { count: 100, msg: '', code: '', data: result };
  }

  // 根据用户id查询数据
  async find(id) {
    const result = await this.app.mysql.get('shopdb').get('authenticity', id);
    return result;
  }

  async add() {
    const result = await this.app.mysql.get('shopdb').insert('authenticity');
    return {
      flag: result.affectedRows,
      msg: result.affectedRows > 0 ? '添加成功' : '添加失败',
    };
  }

  async update() {
    const result = await this.app.mysql.get('shopdb').update('authenticity');
    return {
      flag: result.affectedRows,
      msg: result.affectedRows > 0 ? '修改成功' : '修改失败',
    };
  }

  // 根据id删除数据
  async destroy(id) {
    const result = await this.app.mysql.get('shopdb').delete('authenticity', id);
    return {
      flag: result.affectedRows,
      msg: result.affectedRows > 0 ? '删除成功' : '删除失败',
    };
  }

}

module.exports = UserService;
