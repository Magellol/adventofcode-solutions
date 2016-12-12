const path = require('path');
const fs = require('fs');

function getInput() {
  return fs.readFileSync(path.join(__dirname, 'input'), 'utf8').split(', ');
}

function range(length) {
  return [...Array(length).keys()];
}

module.exports = {
  getInput,
  range
};
