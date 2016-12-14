/**
 * @link http://adventofcode.com/2016/day/2
 *
 * Keypad
 * ---------
 * | 1 2 3 |
 * | 4 5 6 |
 * | 7 8 9 |
 * --------
 */
const { getInput } = require('./helper');
const STARTER_BUTTON = 5;

const inputs = getInput();
const keypad = {
  1: {
    U: null,
    R: 2,
    D: 4,
    L: null
  },

  2: {
    U: null,
    R: 3,
    D: 5,
    L: 1
  },

  3: {
    U: null,
    R: null,
    D: 6,
    L: 2
  },

  4: {
    U: 1,
    R: 5,
    D: 7,
    L: null
  },

  5: {
    U: 2,
    R: 6,
    D: 8,
    L: 4
  },

  6: {
    U: 3,
    R: null,
    D: 9,
    L: 5
  },

  7: {
    U: 4,
    R: 8,
    D: null,
    L: null
  },

  8: {
    U: 5,
    R: 9,
    D: null,
    L: 7
  },

  9: {
    U: 6,
    R: null,
    D: null,
    L: 8
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

  const updatedCode = [...code, [response]];
  return decrypt(inputs, response, index + 1, updatedCode);
}

module.exports = decrypt(inputs, STARTER_BUTTON).join('');
