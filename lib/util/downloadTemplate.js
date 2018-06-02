const Promise = require('bluebird'),
  downloadGitRepo = require('download-git-repo'),
  ora = require('ora');

const util = require('./util'),
  PathUtil = require('./PathUtil'),
  FileUtil = require('./FileUtil'),
  logger = require('../logger');

module.exports = function (templateName) {
  const templateUrlMap = util.getTemplateUrlMap(),
    templateUrl = templateUrlMap[templateName];
  return new Promise(function (resolve, reject) {
    if (!templateUrl) {
      return reject(new Error('Invalid template name'));
    }
    const templateDir = PathUtil.getTemplatePath(templateName);
    if (FileUtil.checkFileExist(templateDir)) {
      logger.log('The ' + templateName + ' is exist. Begin initializing.');
      return resolve(templateDir);
    }
    const spinner = ora('downloading template: ' + templateName);
    spinner.start();
    FileUtil.syncCreateDir(templateDir);
    downloadGitRepo(templateUrl, templateDir, {clone: false}, function (err) {
      spinner.stop();
      if (err) {
        logger.fatal(err);
        reject(err);
      }
      logger.success('Downloaded template: ' + templateName);
      resolve(templateDir);
    });
  });
};
