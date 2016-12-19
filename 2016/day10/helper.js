const fs = require('fs');
const path = require('path');

function max(array) {
  return Math.max(...array);
}

function min(array) {
  return Math.min(...array);
}

function getInput() {
  return fs.readFileSync(path.join(__dirname, 'input'), 'utf8')
    .trimRight()
    .split('\n')
    .reduce((acc, command) => {
      const spaced = command.split(' ');
      const [cmdName, ...args] = spaced;

      if (cmdName === 'value') {
        const [chipId] = args;
        const botId = args[args.length -1];

        return Object.assign({}, acc, {
          initalValueCommands: [...acc.initalValueCommands, [Number(chipId), botId]]
        });
      }

      const [botId, , , , lowDestination, lowBotId, , , , highDestination, highBotId] = args;
      return Object.assign({}, acc, {
        botCommands: [...acc.botCommands, [`bot:${botId}`, `${lowDestination}:${lowBotId}`, `${highDestination}:${highBotId}`]]
      });

    }, {
      initalValueCommands: [],
      botCommands: []
    });
}

module.exports = {
  getInput,
  max,
  min
};
