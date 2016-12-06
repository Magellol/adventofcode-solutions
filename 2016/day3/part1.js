/**
 * @link http://adventofcode.com/2016/day/3
 */
const fs = require('fs');
const collection = require('lodash/collection');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input'), {
  encoding: 'utf8'
})
.trim()
.split('\n')
.map((val, index) => {
  return val.trim().split('  ').map(value => parseInt(value));
});

function getPossibleTriangles(input) {
  return collection.filter(input, (el) => {
    const [a, b, c] = el;
    return (a + b > c) && (a + c > b) && (b + c > a);
  });
}

module.exports = getPossibleTriangles(input).length;
