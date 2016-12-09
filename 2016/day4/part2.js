const { getInput } = require('./helper');

function split(string) {
  const [, name, sectorId] = string.match(/([a-z-]+)-([0-9]+)/);
  return {
    sectorId,
    name
  };
}

function getReplacementCharacter(character, times) {
  if (character === '-') {
    return ' ';
  }

  const charZ = 'z'.charCodeAt(0);
  const position = character.charCodeAt(0) + (times % 26);
  if (position > charZ) {
    return String.fromCharCode(position - 26);
  }

  return String.fromCharCode(position);
}

function decrypt(name, sectorId, {index = 0, decrypted = []} = {}) {
  if (index === name.length) {
    return decrypted.join('');
  }

  const letter = getReplacementCharacter(name[index], sectorId);
  return decrypt(name, sectorId, {
    index: index + 1,
    decrypted: decrypted.concat([letter])
  });
}

function getNorthPoleRoom(rooms, index = 0) {
  if (index === rooms.length) {
    return null; // We could not find it.
  }

  const {name, sectorId} = split(rooms[index]);
  const decrypted = decrypt(name, sectorId);

  if (decrypted === 'northpole object storage') { // The puzzle wasn't giving anything else...
    return parseInt(sectorId);
  }

  return getNorthPoleRoom(rooms, index + 1);
}

const rooms = getInput();
module.exports = getNorthPoleRoom(rooms);
