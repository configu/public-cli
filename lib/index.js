const program = require('commander'),
  inquirer = require('inquirer');

const ProjectGenerator = require('./ProjectGenerator');
const getQuestion = require('./command/getQuestions');
const getProjectConfig = require('./command/getProjectConfig');
const clearCache = require('./clearCache');
// const templateDir = require('./util/PathUtil');


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
    .command('clear')
    .description('Clear local template cache')
    .action(clearCache);

  program
    .command('*')
    .action(function (env) {
      console.log('not fount command', env, '\nhave try -h');
    });
  program.parse(processArgv);
};

module.exports = new InputHandler();
