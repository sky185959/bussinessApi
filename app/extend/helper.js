'use strict';
const moment = require('moment');

module.exports = {
  // 格式化当前时间
  currentDateTime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  },
};
