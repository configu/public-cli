const chalk = require('chalk');
const format = require('util').format;
const ora = require('ora');

const prefix = 'public-cli',
  sep = chalk.gray('·');

exports.log = function () {
  var msg = format.apply(format, arguments);
  console.log(chalk.green(prefix), sep, msg);
};

exports.fatal = function (message) {
  console.error(chalk.red(prefix), message);
};

exports.success = function () {
  var msg = format.apply(format, arguments);
  console.log(chalk.green(prefix), sep, msg);
};

exports.tips = function(msg = '') {
  console.log(msg);
};

exports.oraSuccess = (msg) => ora({
  text: chalk.green(msg)
}).succeed();
