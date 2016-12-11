const { getInput } = require('./helper');
const merge = require('lodash.mergewith');

function getMostCommonCharacter(row, index = 0, characters = {}) {
  if (row.length === index) {
    return Object.keys(characters).sort((a, b) => {
      if (characters[a] === characters[b]) {
        return 0;
      }

      return characters[a] > characters[b] ? -1 : 1;
    })[0];
  }

  const key = row[index];
  const value = characters.hasOwnProperty(key) ? characters[key] : 0;
  const updatedCharacters = Object.assign({}, characters, {
    [key]: value + 1
  });

  return getMostCommonCharacter(row, index + 1, updatedCharacters);
}

function getMessage(array, index = 0, message = []) {
  if (index === array.length) {
    return message.join``;
  }

  const character = getMostCommonCharacter(array[index]);
  const updatedMessage = message.concat(character);

  return getMessage(array, index + 1, updatedMessage);
}

const input = getInput();
const reduced = input.reduce(function reduce(commonCharacters, string) {
  const current = string.split``.map(value => [value]);

  return merge(commonCharacters, current, function merge(value, source) {
    const target = value ? value : [];
    return target.concat(source);
  });
}, []);

module.exports = getMessage(reduced);
