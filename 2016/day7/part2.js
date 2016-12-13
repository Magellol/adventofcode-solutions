const { getInput, compose } = require('./helper');
const getAllAbas = compose(getRealAbas, getPotentialAbas);

function getBabs(string) {
  return getAllAbas(string).map(aba => {
    const [a, b] = aba;
    return b + a + b;
  });
}

function getPotentialAbas(string) {
  return string.split``.map((value, index, array) => {
    return array.slice(index, index + 3);
  });
}

function getRealAbas(array) {
  return array.filter(value => {
    const [a, b, c] = value;
    return (a === c) && a !== b;
  });
}

function split(string) {
  const parts = string.split(/\[([a-z]+)\]/g);

  return parts.reduce((acc, current, index) => {
    acc[index % 2].push(current);
    return acc;
  }, [[], []]);
}

function getValidIps(ips) {
  return ips.filter(ip => {
    const [segments, hypernets] = split(ip);

    const babs = segments.reduce((acc, current) => {
      const babs = getBabs(current);
      return acc.concat(babs);
    }, []);

    return hypernets.some(hypernet => {
      return babs.some(current => hypernet.includes(current));
    });
  });
}

module.exports = getValidIps(getInput()).length;
