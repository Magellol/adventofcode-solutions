const fs = require('fs');
const path = require('path');

function getInput() {
  return fs.readFileSync(path.join(__dirname, 'input'), 'utf8').replace(/\s/g, '');
}

module.exports = {
  getInput
};
