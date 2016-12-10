const { getInput } = require('./helper');
const merge = require('lodash.mergewith');

function getCommonCharacters(row, index = 0, characters = {}) {
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

  return getCommonCharacters(row, index + 1, updatedCharacters);
}

const input = getInput();

// eedadn
const reduced = input.reduce(function reduce(commonCharacters, string) {
  const current = string.split``.map(value => [value]);
  return merge(commonCharacters, current, function merge(value, source) {
    const target = value ? value : [];
    return target.concat(source);
  });
}, []);

const answer = []
for (let i = 0; i < reduced.length; i++) {
  answer.push(getCommonCharacters(reduced[i]));
}

console.log(answer.join``);
