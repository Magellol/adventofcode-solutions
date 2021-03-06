const { getInput, max, min } = require('./helper');

// Return an object of bot having their chips.
function giveInitialChips(commands) {
  return commands.reduce((acc, command) => {
    const [chipId, botId] = command;
    const prop = `bot:${botId}`;

    return Object.assign({}, acc, {
      [prop]: acc[prop] ? [...acc[prop], chipId] : [chipId]
    });
  }, {});
}

function run(commands, entities) {
  let executed = [];
  let index = 0;

  while(executed.length < commands.length) {

    // If we've already executed the current command,
    // let's move onto the next one.
    if (executed.indexOf(index) !== -1) {
      index ++;
      continue;
    }

    const command = commands[index];

    // If we went over the current command list,
    // let's reset it and start over.
    if (typeof command === 'undefined') {
      index = 0;
      continue;
    }

    const [fromBotId, ToLowDestination, toHighDestination] = command;
    const currentBot = entities[fromBotId];

    // If the current bot does not have 2 chips and actually does not even exist,
    // Let's skip this command for now.
    if (typeof currentBot === 'undefined' || currentBot.length !== 2) {
      index ++;
      continue;
    }

    const [low, high] = [min(currentBot), max(currentBot)];

    entities = Object.assign({}, entities, {
      [ToLowDestination]: entities[ToLowDestination] ? [...entities[ToLowDestination], low] : [low],
      [toHighDestination]: entities[toHighDestination] ? [...entities[toHighDestination], high] : [high]
    });

    executed.push(index);
    index++;

  }

  return entities;
}

const {initalValueCommands, botCommands} = getInput();

const entities = giveInitialChips(initalValueCommands);
const output = run(botCommands, entities);

module.exports = Object.keys(output)
  .find(el => {
    const [a, b] = output[el];
    return (a === 61 && b === 17) || (a === 17 && b === 61);
  })
  .replace('bot:', '');
