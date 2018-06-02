var program = require('commander'),
  inquirer = require('inquirer');

var ProjectGenerator = require('./ProjectGenerator');
var getQuestion = require('./command/getQuestions');
var getProjectConfig = require('./command/getProjectConfig');

function InputHandler() {
  this.projectGenerator = null;
}

InputHandler.prototype.initCommand = function (packageJson, processArgv) {
  program
    .version(packageJson.version);

  program.command('new')
    .description('Start Creating A New Project')
    .action(function () {
      inquirer.prompt(getQuestion())
        .then(function (answers) {
          this.projectGenerator = new ProjectGenerator(getProjectConfig(answers));
          return this.projectGenerator.generate();
        });
    });
  program
    .command('*')
    .action(function (env) {
      console.log('not fount command', env, '\nhave try -h');
    });
  program.parse(processArgv);
};

module.exports = new InputHandler();
