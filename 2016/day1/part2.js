/**
 * @link http://adventofcode.com/2016/day/1
 */
const { getInput } = require('./helper');
const DIRECTIONS = ['N', 'E', 'S', 'W'];

const character = {
  facing: 'N',
  movementsHistory: [
    { x: 0, y: 0 }
  ]
};

function turn(to, currentFacingDirection) {
  const index = DIRECTIONS.indexOf(currentFacingDirection);

  const methods = {
    R: function turnRight() {
      if (index === (DIRECTIONS.length - 1)) {
        return DIRECTIONS[0];
      }

      return DIRECTIONS[index + 1];
    },

    L: function turnLeft() {
      if (index === 0) {
        return DIRECTIONS[DIRECTIONS.length - 1];
      }

      return DIRECTIONS[index - 1];
    }
  }

  return methods[to]();
}

function getCharacter(character, {facing, movementsHistory}) {
  return Object.assign({}, character, {
    facing,
    movementsHistory
  });
}

function entryIsInHistory(location, allPlaces) {
  for (let i = 0; i < allPlaces.length; i++) {
    if (location.x === allPlaces[i].x && location.y === allPlaces[i].y) {
      return true;
    }
  }

  return false;
}

function buildHistory(lastMovement, facingDirection) {
  const axis = ['N', 'S'].indexOf(facingDirection) !== -1 ? 'y' : 'x';

  return Object.assign({}, lastMovement, {
    [axis]: ['N', 'E'].indexOf(facingDirection) !== -1 ? lastMovement[axis] + 1 : lastMovement[axis] - 1
  });
}

function move(character, inputs, index = 0) {
  if (index === inputs.length) {
    return character;
  }

  const current = inputs[index];
  const direction = current.substring(0, 1);
  const steps = current.replace(direction, '');
  const facing = turn(direction, character.facing);

  const history = character.movementsHistory.concat([]);
  for (let i = 1; i <= steps; i ++) {
    const lastMove = history[history.length - 1];
    const entry = buildHistory(lastMove, facing);

    if (entryIsInHistory(entry, history)) {
      return getCharacter(character, {
        facing,
        movementsHistory: history.concat([entry])
      });
    }

    history.push(entry);
  }

  const updatedCharacter = getCharacter(character, {
    facing,
    movementsHistory: history
  });

  return move(updatedCharacter, inputs, index + 1);
}

function getTotalBlocksAway(character) {
  const moves = character.movementsHistory;
  const lastMove = moves[moves.length - 1];

  return Math.abs(lastMove.x) + Math.abs(lastMove.y); // Could be better.
}

const inputs = getInput();
const movedCharacter = move(character, inputs);

module.exports = getTotalBlocksAway(movedCharacter);
