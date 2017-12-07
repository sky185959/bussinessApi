'use strict';

const fs = require('fs');
const path = require('path');

module.exports = app => {
  // 使用 app 对象
  const imgUpload = path.join(app.baseDir, 'app', app.config.uploadPath.imgUpload);
  const officeUpload = path.join(app.baseDir, 'app', app.config.uploadPath.officeUpload);
  const otherUpload = path.join(app.baseDir, 'app', app.config.uploadPath.otherUpload);
  console.log('app启动时创建上传的文件夹：');
  if (!fs.existsSync(imgUpload)) {
    fs.mkdir(imgUpload, function(err) {
      if (err) {
        console.log('创建imgUpload文件夹失败');
      } else {
        console.log('创建imgUpload文件夹成功');
      }
    });
  }

  if (!fs.existsSync(officeUpload)) {
    fs.mkdir(officeUpload, function(err) {
      if (err) {
        console.log('创建officeUpload文件夹失败');
      } else {
        console.log('创建officeUpload文件夹成功');
      }
    });
  }

  if (!fs.existsSync(otherUpload)) {
    fs.mkdir(otherUpload, function(err) {
      if (err) {
        console.log('创建otherUpload文件夹失败');
      } else {
        console.log('创建otherUpload文件夹成功');
      }
    });
  }

};
