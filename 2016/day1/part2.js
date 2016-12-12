/**
 * @link http://adventofcode.com/2016/day/1
 */
const { getInput, range } = require('./helper');
const merge = require('lodash.mergewith');

const DIRECTIONS = {
  N: {x: 0, y: 1},
  E: {x: 1, y: 0},
  S: {x: 0, y: -1},
  W: {x: -1, y: 0}
};

const character = {
  facing: 'N',
  history: [
    {x: 0, y: 0}
  ]
};

/**
 * Returns the next facing direction based on the current one.
 */
function turn(currentDirection, to) {
  const directions = Object.keys(DIRECTIONS);
  const index = directions.indexOf(currentDirection);

  const nextIndex = to === 'R' ? 1 : directions.length - 1;
  return directions[(index + nextIndex) % 4];
}

function getTotalBlocksAway(position) {
  const {x, y} = position;
  return Math.abs(x) + Math.abs(y);
}

function findFirstDuplicatePosition(positions) {
  const position = positions
  .map(value => `${value.x}|${value.y}`)
  .find((el, index, array) => array.lastIndexOf(el) !== index);

  const [x, y] = position.split('|');
  return {x, y};
}

/**
 * Turn to the next direction and move x forward.
 * Returns an updated character object.
 */
function move(input, character) {
  const [, direction, steps] = input.split(/([R|L])/);
  const nextDirection = turn(character.facing, direction);
  const coordinates = DIRECTIONS[nextDirection];

  const history = range(parseInt(steps)).reduce((acc, current) => {
    const lastMove = Object.assign({}, acc[acc.length - 1]);
    const move = merge(lastMove, coordinates, (value, source) => value + source);

    acc.push(move);
    return acc;

  }, [...character.history]);

  return Object.assign({}, character, {
    history,
    facing: nextDirection,
  });
}

const updatedCharacter = getInput().reduce((acc, current) => {
  return Object.assign({}, acc, move(current, acc));
}, character);

const firstDuplicatedPosition = findFirstDuplicatePosition(updatedCharacter.history);

module.exports = getTotalBlocksAway(firstDuplicatedPosition);
