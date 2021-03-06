const fs = require('fs');
const path = require('path');

function getInput() {
  return fs.readFileSync(path.join(__dirname, 'input'), {
    encoding: 'utf8'
  }).trimRight().split('\n');
}

module.exports = {
  getInput
};
