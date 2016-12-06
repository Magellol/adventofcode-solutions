const fs = require('fs');
const path = require('path');

function getInput() {
  const p = path.join(__dirname, 'input');
  return fs.readFileSync(p, {
    encoding: 'utf8'
  })
  .trim()
  .split('\n')
  .map((val, index) => {
    return val.trim().split('  ').map(value => parseInt(value));
  });
}

module.exports = {
  getInput
};
