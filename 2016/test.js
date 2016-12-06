const assert = require('assert');

function test (day, part, expected) {
  const answer = require(`./day${day}/part${part}`);
  assert.strictEqual(expected, answer);
}

describe('Puzzles for 2016', function () {
  it('Day 1 part 2', function () {
    test(1, 2, 110);
  });

  it('Day 2 part 1', function () {
    test(2, 1, '78985');
  });

  it('Day 2 part 2', function () {
    test(2, 2, '57DD8');
  });

  it.skip('Day 3 part 1', function () {

  });
});
