const md5 = require('md5');
const fs = require('fs');
const path = require('path');
const cache = require('./cache.json');

// I could not use recursive function because
// the call stack goes way beyond the total allowed range in node...
function decrypt(roomId, index) {
  const password = [];
  let found = 0;

  while(found < 8) {
    const hash = md5(roomId + index);

    // Usually in case the cache ins't built up.
    if (hash.substring(0, 5) !== '00000') {
      index++
      continue;
    }

    const position = hash[5];
    const character = hash[6];

    if (isNaN(position) === false && position < 8 && !password[position]) {
      password[position] = character;
      found++;
    }

    const cachedIndex = cache.indexOf(index);
    if (cachedIndex !== -1) {
      index = cache[cachedIndex + 1] ? cache[cachedIndex + 1] : index + 1;
      continue;
    }

    cache.push(index);
    fs.writeFileSync(path.join(__dirname, 'cache.json'), JSON.stringify(cache));

    index++;
  }

  return password.join('');
}

const startIndex = cache.length > 0 ? cache[0]: 0;
module.exports = decrypt('cxdnnyjw', startIndex);
