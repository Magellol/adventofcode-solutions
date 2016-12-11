const {
  getInput,
  min,
  getKey,
  format,
  rotate,
  triageCharacters
} = require('./helper');

function getMessage(input, index = 0, message = []) {
  if (index === input.length) {
    return message.join``;
  }

  const triaged = triageCharacters(input[index]);

  const key = getKey(triaged, min(triaged));
  const updatedMessage = message.concat(key);

  return getMessage(input, index + 1, updatedMessage);
}

const formatted = format(getInput());
const rotated = rotate(formatted);

module.exports = getMessage(rotated);
