const Promise = require('bluebird');
const Metalsmith = require('metalsmith');
const _ = require('lodash');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const log = require('../logger');

const loadTemplateMeta = require('./loadTemplateMeta');
const template = require('./template');
const ask = require('./ask');
const filterFile = require('./filterFile');

/**
 * Core function to generate project
 * @param {string} templateDir template project root absolute path
 * @param {string} buildDir destination absolute path
 * @param {object} projectConfig
 * @returns {*}
 */
module.exports = function (templateDir, buildDir, projectConfig) {
  // todo:for debug
  // check logic
  if (!_.isString(templateDir) || _.isEmpty(templateDir)) {
    throw new Error('Invalid templateDir');
  }
  if (!_.isString(buildDir) || _.isEmpty(buildDir)) {
    throw new Error('Invalid buildDir');
  }
  if (!_.isPlainObject(projectConfig) || _.isEmpty(_.keys(projectConfig))) {
    throw new Error('Invalid projectConfig');
  }
  return new Promise(function (resolve, reject) {
    const templateMeta = loadTemplateMeta(templateDir);
    const allMeta = {
      context: projectConfig
    };
    _.assign(allMeta, {
      meta: templateMeta
    });

    Metalsmith(buildDir)
      .clean(true)
      .metadata(allMeta)
      .source(path.resolve(templateDir, './template'))
      .destination('./')
      .use(ask(templateMeta.prompts))
      .use(filterFile(templateMeta.filters))
      .use(template)
      .build(function (err) {
        log.tips();
        if (err) {
          return reject(err);
        }
        //Generated success
        ora({
          text: chalk.green(`${projectConfig.basic.name} generated  success`)
        }).succeed();
        log.tips();
        resolve();
      });
  });

};


