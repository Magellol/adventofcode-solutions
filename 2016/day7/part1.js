const { getInput, compose } = require('./helper');
const getAbbas = compose(getRealAbbas, getPotentialAbbas);

function getPotentialAbbas(string) {
  return string.split``.map((value, index, array) => {
    return array.slice(index, index + 4);
  });
}

function getRealAbbas(array) {
  return array.filter(value => {
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

function getValidIps(ips) {
  return ips.filter(ip => {
    const [segments, hypernets] = split(ip);

    // Checking if hypernets have some ABBA's.
    const hypernetsHaveAbbas = hypernets.some(hypernet => getAbbas(hypernet).length);

    if (hypernetsHaveAbbas === true) {
      return false;
    }

    return segments.some(segment => getAbbas(segment).length);
  });
}

module.exports = getValidIps(getInput()).length;
