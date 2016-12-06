/**
 * @link http://adventofcode.com/2016/day/3
 */
const collection = require('lodash/collection');
const { getInput } = require('./helper');

function getPossibleTriangles(input) {
  return collection.filter(input, (el) => {
    const [a, b, c] = el;
    return (a + b > c) && (a + c > b) && (b + c > a);
  });
}

const input = getInput();
module.exports = getPossibleTriangles(input).length;
