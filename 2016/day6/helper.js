const fs = require('fs');
const path = require('path');

function getInput() {
  return fs.readFileSync(path.join(__dirname, 'input'), 'utf8').trimRight().split('\n');
}

function max(obj) {
  const values = Object.values(obj);
  return Math.max(...values);
}

function min(obj) {
  const values = Object.values(obj);
  return Math.min(...values);
}

function getKey(obj, value) {
  return Object.keys(obj).find(el => obj[el] === value);
}

function format(array) {
  return array.map(value => value.split``);
}

function rotate(array) {
  return array.reduce((acc, current) => {
    current.map((value, index) => {
      acc[index] = acc[index] ? acc[index].concat([value]) : [value];
    });

    return acc;
  }, []);
}

function triageCharacters(row) {
  return row.reduce((characters, current) => {
    return Object.assign({}, characters, {
      [current]: characters[current] ? characters[current] + 1: 1
    });
  }, {});
};

module.exports = {
  getInput,
  max,
  min,
  getKey,
  format,
  rotate,
  triageCharacters
};
