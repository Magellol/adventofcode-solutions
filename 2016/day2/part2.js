/**
 * @link http://adventofcode.com/2016/day/2
 *
 * Keypad
 * ---------
 *     1
 *   2 3 4
 * 5 6 7 8 9
 *   A B C
 *     D
 * ---------
 */
const { getInput } = require('./helper');
const STARTER_BUTTON = 5;

const inputs = getInput();
const keypad = {
  1: {
    U: null,
    R: null,
    D: 3,
    L: null
  },

  2: {
    U: null,
    R: 3,
    D: 6,
    L: null
  },

  3: {
    U: 1,
    R: 4,
    D: 7,
    L: 2
  },

  4: {
    U: null,
    R: null,
    D: 8,
    L: 3
  },

  5: {
    U: null,
    R: 6,
    D: null,
    L: null
  },

  6: {
    U: 2,
    R: 7,
    D: 'A',
    L: 5
  },

  7: {
    U: 3,
    R: 8,
    D: 'B',
    L: 6
  },

  8: {
    U: 4,
    R: 9,
    D: 'C',
    L: 7
  },

  9: {
    U: null,
    R: null,
    D: null,
    L: 8
  },

  A: {
    U: 6,
    R: 'B',
    D: null,
    L: null
  },

  B: {
    U: 7,
    R: 'C',
    D: 'D',
    L: 'A'
  },

  C: {
    U: 8,
    R: null,
    D: null,
    L: 'B'
  },

  D: {
    U: 'B',
    R: null,
    D: null,
    L: null
  }
};

function get(currentButton, direction) {
  return keypad[currentButton][direction];
}

function press(commands, currentButton, index = 0) {
  if (index === commands.length) {
    return currentButton;
  }

  const next = get(currentButton, commands[index]);
  if (next === null) {
    return press(commands, currentButton, index + 1);
  }

  return press(commands, next, index + 1);
}

function decrypt(inputs, starterButton, index = 0, code = []) {
  if (index === inputs.length) {
    return code; // We've found it.
  }

  const commands = [...inputs[index]];
  const response = press(commands, starterButton);

  const updatedCode = code.concat([response]);
  return decrypt(inputs, response, index + 1, updatedCode);
}

module.exports = decrypt(inputs, STARTER_BUTTON).join('');
