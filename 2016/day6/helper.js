const fs = require('fs');
const path = require('path');
const merge = require('lodash.mergewith');

function getInput() {
  return fs.readFileSync(path.join(__dirname, 'input'), 'utf8').trimRight().split('\n');
}

function reduce(array) {
  return array.reduce(function reduce(commonCharacters, string) {
    const current = string.split``.map(value => [value]);

    return merge(commonCharacters, current, function merge(value, source) {
      const target = value ? value : [];
      return target.concat(source);
    });
  }, []);
}

function getCharacter({
  row,
  index = 0,
  last = false,
  characters = {}
}) {
  if (row.length === index) {
    const sorted = Object.keys(characters).sort((a, b) => {
      if (characters[a] === characters[b]) {
        return 0;
      }

      return characters[a] > characters[b] ? -1 : 1;
    });

    return last === true ? sorted[sorted.length - 1] : sorted[0];
  }

  const key = row[index];
  const value = characters.hasOwnProperty(key) ? characters[key] : 0;
  const updatedCharacters = Object.assign({}, characters, {
    [key]: value + 1
  });

  return getCharacter({
    row,
    last,
    index: index + 1,
    characters: updatedCharacters
  });
}

module.exports = {
  getInput,
  getCharacter,
  reduce
};
