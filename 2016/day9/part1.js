const fs = require('fs');
const path = require('path');

function count(string) {
  const arr = string.split('');

  let length = 0;
  let i = 0;

  while(i < arr.length) {
    const current = arr[i];
    if (['(', ')'].indexOf(current) === -1) {
      length ++;
      i++;
      continue;
    }

    if(current === '(') {
      const closingIndex = arr.slice(i).indexOf(')');
      const end = i + closingIndex;
      const [, number, times] = arr.slice(i + 1, end).join``.match(/([0-9]+)x([0-9]+)/);

      length += parseInt(number) * parseInt(times);
      i = end + parseInt(number) + 1;
    }
  }

  return length;
}

const string = fs.readFileSync(path.join(__dirname, 'input'), 'utf8').replace(/\s/g, '');
module.exports = count(string);
