const inquirer = require('inquirer');
const _ = require('lodash');

const promptMapping = {
  string: 'input',
  boolean: 'confirm'
};

function wrapper(prompts) {
  return function (promptKey) {
    const prompt = prompts[promptKey];
    let msg = prompt.message || prompt.label || promptKey;
    let promptType = promptMapping[prompt.type] || prompt.type;

    return {
      type: promptType,
      name: promptKey,
      message: `${msg}:`,
      choices: prompt.choices || [],
      filter: prompt.filter || function (val) {
        return val;
      },
      // default: promptDefault, 
      validate: prompt.validate || function () {
        return true;
      }
    };
  };
}


module.exports = function (prompts = {}) {
  return function (files, metalsmith, next) {
    var metadata = metalsmith.metadata();
    const result = Object.keys(prompts).map(wrapper(prompts));
    inquirer.prompt(result)
      .then(function (answers) {
        _.forEach(answers, function (value, key) {
          _.set(metadata, key, value);
        });
        next();
      });
  };
};
