const { range, getInput, getBaseScreen } = require('./helper');

/**
 * Fill the screen with a rectangle (can be square because squares are rectangles).
 * Returns an updated version of the screen.
 */
function createRectangle(screen, {width, height}) {
  const subs = range(width).fill(1);
  const rectangle = range(height).fill(subs);

  return screen.map((row, index) => {
    const copy = [...row];

    if (typeof rectangle[index] === 'undefined') {
      return copy;
    }

    copy.splice(0, rectangle[index].length, ...rectangle[index]);
    return copy;
  });
}

/**
 * Rotate a column (called x in this puzzle) by the number of steps.
 * If a index reaches the bottom of the screen, then put it back on top and keep going.
 * Returns an updated version of the screen.
 */
function column(screen, {offset, steps}) {
  const column = screen.reduce((acc, current, index, array) => {
    const item = current[offset];
    const nextIndex = (index + steps) % array.length;

    acc[nextIndex] = item;
    return acc;
  }, []);

  return screen.map((row, index) => {
    const clone = [...row];

    clone[offset] = column[index];
    return clone;
  });
}

/**
 * Rotate a row (called y in this puzzle) by the number of steps.
 * If an index reach the right-edge of the screen, put it back in the left and keep going.
 */
function row(screen, {offset, steps}) {
  const row = screen[offset];
  const updated = row.reduce((acc, current, index, array) => {
    const nextIndex = (index + steps) % array.length;

    acc[nextIndex] = current;
    return acc;
  }, []);

  const clone = [...screen];
  clone[offset] = updated;

  return clone;
}

function getFinalScreen(input) {
  const baseScreen = getBaseScreen(50, 6);

  return input.reduce((screen, command) => {
    const [cmdName, ...args] = command;

    if (cmdName === 'rect') {
      const [width, height] = args;
      return createRectangle(screen, {width, height});
    }

    const [offset, steps] = args;

    const options = {
      offset,
      steps: parseInt(steps)
    };

    if (cmdName === 'row') {
      return row(screen, options);
    }

    return column(screen, options);
  }, baseScreen);
}

const input = getInput();
module.exports = getFinalScreen(input).reduce((total, current) => {
  return total + current.filter(value => value === 1).length; // There's probably a better solution.
}, 0);
