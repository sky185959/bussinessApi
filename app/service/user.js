'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  // 获取所有用户列表
  async getList() {
    const result = await this.app.mysql.get('shopdb').select('tb_users', {
      orders: [[ 'id', 'desc' ]], // 排序方式
    });
    return { data: result };
  }

  // 分页获取数据
  async getListWithPage(page, pageSize) {
    const result = await this.app.mysql.get('shopdb').select('tb_users', {
      orders: [[ 'id', 'desc' ]], // 排序方式
      limit: parseInt(pageSize), // 返回数据量
      offset: (page - 1) * pageSize, // 数据偏移量
    });
    return { count: 100, msg: '', code: '', data: result };
  }

  // 根据用户id查询数据
  async findByID(userId) {
    const result = await this.app.mysql.get('shopdb').get('tb_users', { id: userId });
    return { data: result };
  }

  async addModel(data) {
    // 新增的数据
    // const user = {
    //   username: data.username,
    //   sex: data.sex,
    //   email: data.email,
    //   phone: data.phone,
    // };
    // 新增数据
    const result = await this.app.mysql.get('shopdb').insert('tb_users', data);
    return {
      insertId: result.insertId, // 添加返回的ID
      error_code: result.affectedRows,
      msg: result.affectedRows > 0 ? '添加成功' : '添加失败',
    };
  }

  async updateModel(data) {
    // 修改数据，将会根据主键 ID 查找，并更新
    // const user = {
    //   id: data.Id,
    //   username: data.username,
    //   sex: data.sex,
    //   email: data.email,
    //   phone: data.phone,
    // };
    const result = await this.app.mysql.get('shopdb').update('tb_users', data);
    return {
      error_code: result.affectedRows,
      msg: result.affectedRows > 0 ? '修改成功' : '修改失败',
    };
  }

  // 根据id删除数据
  async destroyModel(userId) {
    const result = await this.app.mysql.get('shopdb').delete('tb_users', { id: userId });
    return {
      error_code: result.affectedRows,
      msg: result.affectedRows > 0 ? '删除成功' : '删除失败',
    };
  }

}

module.exports = UserService;
