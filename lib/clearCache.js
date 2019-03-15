const { getTemplateDir } = require('./util/PathUtil');
const rimraf = require('rimraf');
const { checkFileExist } = require('./util/FileUtil');
const logger = require('./logger');

const templateDir = getTemplateDir();

module.exports = () => {
  logger.log('Cache in ' + templateDir);
  if (!checkFileExist(templateDir)) {
    logger.log('There is not local template dir');
    return;
  }
  rimraf(templateDir, (err) => {
    if (err) logger.log('cache in ' + templateDir);
    logger.oraSuccess('Clear cache success');
  });
};