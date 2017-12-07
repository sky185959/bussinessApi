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
    // 上传到制定的文件夹中
    switch (extname) {
      case '.jpg':
      case '.jpeg':
      case '.png':
      case '.bmp':
      case '.gif':
        targetDir = path.join(this.config.baseDir, 'app', this.config.uploadPath.imgUpload, filename);
        returnUrl = path.join(this.config.uploadPath.imgUpload, filename);
        break;
      case '.doc':
      case '.docx':
      case '.xls':
      case '.xlsx':
      case '.ppt':
      case '.ppts':
      case '.txt':
        targetDir = path.join(this.config.baseDir, 'app', this.config.uploadPath.officeUpload, filename);
        returnUrl = path.join(this.config.uploadPath.officeUpload, filename);
        break;
      default:
        targetDir = path.join(this.config.baseDir, 'app', this.config.uploadPath.otherUpload, filename);
        returnUrl = path.join(this.config.uploadPath.otherUpload, filename);
        break;
    }
    const writeStream = fs.createWriteStream(targetDir);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    // 返回文件的路径
    this.ctx.body = {
      msg: '单文件上传',
      url: returnUrl,
    };
  }

  // 多文件上传
  async MultipleUpload() {
    const parts = this.ctx.multipart({ autoFields: true });
    const files = [];

    let stream;
    while ((stream = await parts()) != null) {
      const extname = path.extname(stream.filename).toLowerCase();
      const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
      // 文件保存的目录
      let targetDir;
      let returnUrl;
      // 上传到制定的文件夹中
      switch (extname) {
        case '.jpg':
        case '.jpeg':
        case '.png':
        case '.bmp':
        case '.gif':
          targetDir = path.join(this.config.baseDir, 'app', this.config.uploadPath.imgUpload, filename);
          returnUrl = path.join(this.config.uploadPath.imgUpload, filename);
          break;
        case '.doc':
        case '.docx':
        case '.xls':
        case '.xlsx':
        case '.ppt':
        case '.ppts':
        case '.txt':
          targetDir = path.join(this.config.baseDir, 'app', this.config.uploadPath.officeUpload, filename);
          returnUrl = path.join(this.config.uploadPath.officeUpload, filename);
          break;
        default:
          targetDir = path.join(this.config.baseDir, 'app', this.config.uploadPath.otherUpload, filename);
          returnUrl = path.join(this.config.uploadPath.otherUpload, filename);
          break;
      }

      const writeStream = fs.createWriteStream(targetDir);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
      files.push(returnUrl);
    }
    // 返回文件的路径
    this.ctx.body = {
      msg: '多文件上传',
      count: files.length,
      urls: files,
    };
  }

}

module.exports = UploadController;
