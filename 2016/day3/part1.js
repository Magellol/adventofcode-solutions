/**
 * @link http://adventofcode.com/2016/day/3
 */
const { getInput } = require('./helper');

function getPossibleTriangles(input) {
  return input.filter(el => {
    const [a, b, c] = el;
    return (a + b > c) && (a + c > b) && (b + c > a);
  });
}

const input = getInput();
module.exports = getPossibleTriangles(input).length;
