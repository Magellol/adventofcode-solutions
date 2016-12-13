const { getInput, compose } = require('./helper');
const getAllAbbas = compose(getAbbasFrom, buildPotentialAbbas);

function buildPotentialAbbas(string) {
  return string.split``.map((value, index, array) => {
    return [value, array[index + 1], array[index + 2], array[index + 3]];
  });
}

function getAbbasFrom(array) {
  return array.filter((value) => {
    const [a, b, c, d] = value;
    return (a === d && b === c) && a !== b;
  });
}

function split(string) {
  const parts = string.split(/\[([a-z]+)\]/g);

  return parts.reduce((acc, current, index) => {
    acc[index % 2].push(current);
    return acc;
  }, [[], []]);
}

module.exports = getInput().filter((ip) => {
  const [segments, hypernets] = split(ip);
  const hypernetAbbas = hypernets.filter((value) => getAllAbbas(value).length > 0);
  const segmentsAbbas = segments.filter((value) => getAllAbbas(value).length > 0);

  if (hypernetAbbas.length > 0) {
    return false;
  }

  return segmentsAbbas.length > 0;
}).length;
