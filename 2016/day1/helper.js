const path = require('path');
const fs = require('fs');

function getInput() {
  return fs.readFileSync(path.join(__dirname, 'input'), 'utf8').split(', ');
}

module.exports = {
  getInput
};
