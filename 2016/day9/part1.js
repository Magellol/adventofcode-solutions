const { getInput } = require('./helper');

function count(array, index = 0, length = 0) {
  if (index >= array.length) {
    return length;
  }

  const current = array[index];
  if (['(',')'].indexOf(current) === -1) {
    return count(array, index + 1, length + 1);
  }

  const closingParenthesisIndex = array.slice(index).indexOf(')');
  const endIndex = index + closingParenthesisIndex;
  const [characterNumber, times] = array.slice(index + 1, endIndex).join``.split('x').map(val => parseInt(val));

  const updatedIndex = (endIndex + characterNumber + 1);
  const updatedLength = length + (characterNumber * times);

  return count(array, updatedIndex, updatedLength);
}

const input = getInput().split``;
module.exports = count(input);
