const { getInput } = require('./helper');

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

    const closingParenthesisIndex = arr.slice(i).indexOf(')');
    const endIndex = i + closingParenthesisIndex;
    const [characterNumber, times] = arr.slice(i + 1, endIndex).join``.split('x').map(val => parseInt(val));

    length += (characterNumber * times);
    i = endIndex + characterNumber + 1;
  }

  return length;
}

module.exports = count(getInput());
