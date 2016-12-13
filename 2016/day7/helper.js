const fs = require('fs');
const path = require('path');

function getInput() {
  return fs.readFileSync(path.join(__dirname, 'input'), 'utf8').trimRight().split('\n');
}

function compose(a, b) {
  return (...args) => a(b(...args));
}

module.exports = {
  getInput,
  compose
};
