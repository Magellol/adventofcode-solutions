/**
 * @link http://adventofcode.com/day/3
 */
const { getInput } = require('./helper');
const BATCH_NUMBER = 3;

function extract(array, column) {
  return array.reduce((acc, current) => {
    acc.push(current[column]);
    return acc;
  }, []);
}

function buildTriangleArray(array) {
  return array.map((value, index) => extract(array, index));
}

function read(input, index = 0, triangles = []) {
  if (index >= input.length) {
    return triangles;
  }

  const current = input.slice(index, index + BATCH_NUMBER);
  const newTriangles = triangles.concat(buildTriangleArray(current));

  return read(input, index + BATCH_NUMBER, newTriangles);
}

function getPossibleTriangles(input) {
  return input.filter(el => {
    const [a, b, c] = el;
    return (a + b > c) && (a + c > b) && (b + c > a);
  });
}

const triangles = read(getInput());
module.exports = getPossibleTriangles(triangles).length;
