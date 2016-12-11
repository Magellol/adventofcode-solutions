const {
  getInput,
  getCharacter,
  reduce
} = require('./helper');

function getMessage(array, index = 0, message = []) {
  if (index === array.length) {
    return message.join``;
  }

  const character = getCharacter({
    row: array[index],
    last: true
  });

  const updatedMessage = message.concat(character);
  return getMessage(array, index + 1, updatedMessage);
}

const input = getInput();
module.exports = getMessage(reduce(input));
