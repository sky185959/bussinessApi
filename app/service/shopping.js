'use strict';

const Service = require('egg').Service;

class ShoppingService extends Service {
  // 获取APP首页获取商品的信息
  async list(page, pageSize) {
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;
    // 轮播图列表
    const bannerList = await this.app.mysql.select('tb_banner', {
      orders: [[ 'id', 'desc' ]], // 排序方式
      limit: 3, // 返回数据量
      offset: 0, // 数据偏移量
    });
    // 本周推荐
    const weekRecommend = await this.app.mysql.select('tb_goods', {
      where: { sale_ty: 0 },
      orders: [[ 'id', 'desc' ]], // 排序方式
      limit, // 返回数据量
      offset, // 数据偏移量
    });
    // 本月推荐
    const monthRecommend = await this.app.mysql.select('tb_goods', {
      where: { sale_ty: 1 },
      orders: [[ 'id', 'desc' ]], // 排序方式
      limit, // 返回数据量
      offset, // 数据偏移量
    });
    // 家庭套装
    const homeRecommend = await this.app.mysql.select('tb_goods', {
      where: { sale_ty: 2 },
      orders: [[ 'id', 'desc' ]], // 排序方式
      limit, // 返回数据量
      offset, // 数据偏移量
    });
    // 推荐列表
    const recommendList = await this.app.mysql.select('tb_goods', {
      where: { sale_ty: 3 },
      orders: [[ 'id', 'desc' ]], // 排序方式
      limit, // 返回数据量
      offset, // 数据偏移量
    });
    return {
      companyname: '北京快速购科技有限公司',
      bannerList,
      weekRecommend,
      monthRecommend,
      homeRecommend,
      recommendList,
    };
  }

  // 分页获取数据
  async getListByPage(page, pageSize, goodsname) {
    let result = null;
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;
    // 获取总条数
    const count = await this.app.mysql.query('SELECT count(id) as totalCount FROM tb_goods');
    // 根据用户名模糊搜索
    if (goodsname) {
      const sql = " select * from tb_goods where goodsname like '%" + goodsname + "%' limit " + offset + ',' + limit;
      result = await this.app.mysql.query(sql);
    } else {
      result = await this.app.mysql.select('tb_goods', {
        orders: [[ 'id', 'desc' ]], // 排序方式
        limit, // 返回数据量
        offset, // 数据偏移量
      });
    }
    return { count: count.length > 0 ? count[0].totalCount : 0, msg: '', code: '', data: result };
  }

  // 根据id查询数据
  async findByID(id) {
    const result = await this.app.mysql.get('tb_goods', { id });
    return { data: result };
  }

  // 新增商品
  async addModel(data) {
    const { ctx, app } = this;
    // 获取当前时间，状态2是上架时间，其他是下架时间
    const currenttime = ctx.helper.currentDateTime();
    if (data.status === 2) {
      data.up_time = currenttime;
    } else {
      data.down_time = currenttime;
    }
    data.create_time = currenttime;
    const result = await app.mysql.insert('tb_goods', data);
    return {
      insertId: result.insertId, // 添加返回的ID
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '添加成功' : '添加失败',
    };
  }

  // 修改商品
  async updateModel(data) {
    // 修改数据，将会根据主键ID并更新
    const { ctx, app } = this;
    // 获取当前时间，状态2是上架时间，其他是下架时间
    const currenttime = ctx.helper.currentDateTime();
    if (data.status === 2) {
      data.up_time = currenttime;
    } else {
      data.down_time = currenttime;
    }
    const result = await app.mysql.update('tb_goods', data);
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '修改成功' : '修改失败',
    };
  }

  // 根据id删除数据
  async destroyModel(id) {
    const result = await this.app.mysql.delete('tb_goods', { id });
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '删除成功' : '删除失败',
    };
  }

  async getShoppingListByShop(spid) {
    const result = await this.app.mysql.select('tb_goods', {
      where: { shop_id: spid },
    });
    return { count: result.length, msg: '', code: '', data: result };
  }

  async getShoppingListBySaleTy(saleid) {
    const result = await this.app.mysql.select('shopping', {
      where: { sale_ty: saleid, is_delete: 0, status: 2 },
    });
    return { count: result.length, msg: '', code: '', data: result };
  }

}

module.exports = ShoppingService;
