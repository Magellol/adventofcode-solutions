const { getInput } = require('./helper');

function split(string) {
  const [, name, sectorId, checksum] = string.match(/([a-z-]+)-([0-9]+)\[([a-z]+)\]/);
  return {
    checksum,
    sectorId,
    name: name.replace(/-/g, '')
  };
}

function validate(name, expectedChecksum) {
  const characters = getCommonCharacters(name);

  const sorted = Object.keys(characters).sort((a, b) => {
    if (characters[a] === characters[b]) {
      return a < b ? -1 : 1;
    }

    return characters[a] > characters[b] ? -1 : 1;
  });

  const actualChecksum = sorted.slice(0, 5);
  return actualChecksum.join('') === expectedChecksum;
}

function getCommonCharacters(string, index = 0, characters = {}) {
  if (index === string.length) {
    return characters;
  }

  const key = string[index];
  const value = characters.hasOwnProperty(key) ? characters[key] : 0;
  const updatedCharacters = Object.assign({}, characters, {
    [key]: value + 1
  });

  return getCommonCharacters(string, index + 1, updatedCharacters);
}

function run(input, index = 0, sectorIdSum = 0) {
  if (index === input.length) {
    return sectorIdSum;
  }

  const {name, checksum, sectorId} = split(input[index]);
  if (validate(name, checksum) === false) {
    return run(input, index + 1, sectorIdSum);
  }

  const sum = sectorIdSum + parseInt(sectorId);
  return run(input, index + 1, sum);
}

const input = getInput();

module.exports = run(input);
