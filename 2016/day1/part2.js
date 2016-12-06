/**
 * @link http://adventofcode.com/2016/day/1
 */
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

const inputs = [
  'R4', 'R1', 'L2', 'R1', 'L1', 'L1', 'R1', 'L5', 'R1', 'R5', 'L2', 'R3', 'L3', 'L4', 'R4', 'R4', 'R3', 'L5', 'L1',
  'R5', 'R3', 'L4', 'R1', 'R5', 'L1', 'R3', 'L2', 'R3', 'R1', 'L4', 'L1', 'R1', 'L1', 'L5', 'R1', 'L2', 'R2', 'L3',
  'L5', 'R1', 'R5', 'L1', 'R188', 'L3', 'R2', 'R52', 'R5', 'L3', 'R79', 'L1', 'R5', 'R186', 'R2', 'R1', 'L3', 'L5',
  'L2', 'R2', 'R4', 'R5', 'R5', 'L5', 'L4', 'R5', 'R3', 'L4', 'R4', 'L4', 'L4', 'R5', 'L4', 'L3', 'L1', 'L4', 'R1',
  'R2', 'L5', 'R3', 'L4', 'R3', 'L3', 'L5', 'R1', 'R1', 'L3', 'R2', 'R1', 'R2', 'R2', 'L4', 'R5', 'R1', 'R3', 'R2',
  'L2', 'L2', 'L1', 'R2', 'L1', 'L3', 'R5', 'R1', 'R4', 'R5', 'R2', 'R2', 'R4', 'R4', 'R1', 'L3', 'R4', 'L2', 'R2',
  'R1', 'R3', 'L5', 'R5', 'R2', 'R5', 'L1', 'R2', 'R4', 'L1', 'R5', 'L3', 'L3', 'R1', 'L4', 'R2', 'L2', 'R1', 'L1',
  'R4', 'R3', 'L2', 'L3', 'R3', 'L2', 'R1', 'L4', 'R5', 'L1', 'R5', 'L2', 'L1', 'L5', 'L2', 'L5', 'L2', 'L4', 'L2', 'R3'
];

const movedCharacter = move(character, inputs);

module.exports = getTotalBlocksAway(movedCharacter);
