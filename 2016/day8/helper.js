const fs = require('fs');
const path = require('path');

function range(length) {
  const int = parseInt(length);
  return [...Array(int).keys()];
}

function getHumanFriendlyRectangleArguments(input) {
  const [args] = input;

  return args.split('x');
}

function getHumanFriendlyRotateArguments(input) {
  const [columnIndex, , steps] = input;
  const sanitizedColumnIndex = columnIndex.substring(2);

  return [sanitizedColumnIndex, steps];
}

function getInput() {
  return fs.readFileSync(path.join(__dirname, 'input'), 'utf8')
    .trimRight()
    .split('\n')
    .map(cmd => {
      const [cmdName, ...rest] = cmd.split(' ');
      if (cmdName === 'rect') {
        return [cmdName, ...getHumanFriendlyRectangleArguments(rest)];
      }

      const [direction, ...args] = rest;
      return [direction, ...getHumanFriendlyRotateArguments(args)];
    });
}

function getBaseScreen(width, height) {
  const subs = range(width).fill(0);
  return range(height).fill(subs);
}

module.exports = {
  range,
  getInput,
  getBaseScreen
};
