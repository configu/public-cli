// 遍历筛选文件

const match = require('minimatch');
const evaluate = require('./eval');

module.exports = function (filters) {
  return function (files, metalsmith, next) {    
    if(!filters) {
      return next();
    }

    const data = metalsmith.metadata();
    const fileNames = Object.keys(files);

    Object.keys(filters).forEach(function (reg) {
      fileNames.forEach(function (file) {
        if (match(file, reg, { dot: true })) {
          // 获取到匹配的值
          var condition = filters[reg];
          if (!evaluate(condition, data)) {
            // 删除文件
            delete files[file];
          }
        }
      });
    });
    next();
  };
};
