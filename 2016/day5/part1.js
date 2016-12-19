const md5 = require('md5');
const fs = require('fs');
const path = require('path');

const CACHE = require('./cache.json');

// TODO
// I've ditched the cache writing but I need to put it back in.
function decrypt(roomId, index, password = []) {
  return new Promise(resolve => {
    const hash = md5(roomId + index);

    if (hash.substring(0, 5) !== '00000') {
      return resolve(password);
    }

    return resolve([...password, hash[5]]);
  })
  .then(password => {
    if (password.length === 8) {
      return password.join``;
    }

    const cachedIndex = CACHE.indexOf(index);
    if (cachedIndex !== -1) {
      const newIndex = CACHE[cachedIndex + 1] ? CACHE[cachedIndex + 1] : index + 1;
      return decrypt(roomId, newIndex, password);
    }

    return decrypt(roomId, index + 1, password);
  });
}

const startIndex = CACHE.length > 0 ? CACHE[0] : 0;
module.exports = decrypt('cxdnnyjw', startIndex);
