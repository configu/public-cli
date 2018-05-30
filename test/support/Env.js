const path = require('path');
const os = require('os');
const mkdirp = require('mkdirp');
const del = require('del');

const tmpDir = os.tmpdir();

function getTempDirName() {
  return path.resolve(tmpDir, 'public-cli-test');
}

function getTempDir() {
  const testDirName = getTempDirName();
  mkdirp.sync(testDirName);
  console.log(testDirName, ' is created');
  return testDirName;
}

function clearEnv() {
  const testDirName = getTempDirName();
  del.sync([testDirName], {force: true});
}

exports.getTempDir = getTempDir;
exports.clearEnv = clearEnv;

