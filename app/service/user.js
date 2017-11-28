'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  // 获取用户列表
  async list() {
    const result = await this.app.mysql.get('shopdb').select('tb_users');
    return { count: 100, msg: '', code: '', data: result };
  }

  // 根据用户id查询数据
  async find(userId) {
    const result = await this.app.mysql.get('shopdb').get('tb_users', { id: userId });
    return { userInfo: result };
  }

  async add() {
    const result = await this.app.mysql.get('shopdb').insert('tb_users');
    return {
      insertId: result.insertId,
      flag: result.affectedRows,
      msg: result.affectedRows > 0 ? '添加成功' : '添加失败',
    };
  }

  async update() {
    // 修改数据，将会根据主键 ID 查找，并更新
    const row = {
      id: 123,
      username: 'fengmk2',
      sex: 'other field value',
      email: 'other field value',
      phone: 'other field value',
      modifiedAt: this.app.mysql.literals.now,
    };
    const result = await this.app.mysql.get('shopdb').update('tb_users', row);
    return {
      flag: result.affectedRows,
      msg: result.affectedRows > 0 ? '修改成功' : '修改失败',
    };
  }

  // 根据id删除数据
  async destroy(userId) {
    const result = await this.app.mysql.get('shopdb').delete('tb_users', { id: userId });
    return {
      flag: result.affectedRows,
      msg: result.affectedRows > 0 ? '删除成功' : '删除失败',
    };
  }

}

module.exports = UserService;
