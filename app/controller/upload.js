'use strict';

const Controller = require('egg').Controller;

const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;
const path = require('path');
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {

  // 单文件上传
  async fileSingleUpload() {
    const stream = await this.ctx.getFileStream();
    const extname = path.extname(stream.filename).toLowerCase();
    const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
    // 文件保存的目录
    let targetDir;
    let returnUrl;
    // 图片上传到imgUpload文件夹中
    if (extname === '.jpg' || extname === '.jpeg' || extname === '.png' || extname === '.gif' || extname === '.bmp') {
      targetDir = path.join(this.config.baseDir, '/app/public/imgUpload', filename);
      returnUrl = path.join('/public/imgUpload', filename);
    } else if (extname === '.doc' || extname === '.txt' || extname === '.xls') {
      targetDir = path.join(this.config.baseDir, '/app/public/officeUpload', filename);
      returnUrl = path.join('/public/officeUpload', filename);
    } else {
      targetDir = path.join(this.config.baseDir, '/app/public/otherUpload', filename);
      returnUrl = path.join('/public/otherUpload', filename);
    }
    console.log(targetDir);
    const writeStream = fs.createWriteStream(targetDir);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    // 返回文件的路径
    this.ctx.body = { url: returnUrl };
  }

  // 多文件上传
  async MultipleUpload() {
    // to do
  }

}

module.exports = UploadController;
