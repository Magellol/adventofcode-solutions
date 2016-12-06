/**
 * @link http://adventofcode.com/day/3
 */
const { getInput } = require('./helper');
const BATCH_NUMBER = 3;

function take(array, startIndex, batch) {
  return array.concat([]).splice(startIndex, batch);
}

function extract(array, column) {
  return array.reduce(function reduce(accumulator, current) {
    accumulator.push(current[column]);
    return accumulator;
  }, []);
}

function buildTriangleArray(array, index = 0, triangles = []) {
  if (index === array.length) {
    return triangles;
  }

  const newTriangles = [extract(array, index)];
  return buildTriangleArray(array, index + 1, triangles.concat(newTriangles));
}

function read(input, index = 0, triangles = []) {
  if (index >= input.length) {
    return triangles;
  }

  const current = take(input, index, BATCH_NUMBER);
  const newTriangles = triangles.concat(buildTriangleArray(current));

  return read(input, index + BATCH_NUMBER, newTriangles);
}

function getPossibleTriangles(input) {
  return input.filter(el => {
    const [a, b, c] = el;
    return (a + b > c) && (a + c > b) && (b + c > a);
  });
}

const input = getInput();
const triangles = read(input);
module.exports = getPossibleTriangles(triangles).length;
