const assert = require('assert');

function test (day, part, expected) {
  const answer = require(`./day${day}/part${part}`);
  assert.strictEqual(answer, expected);
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

  it('Day 3 part 1', function () {
    test(3, 1, 982);
  });

  it('Day 3 part 2', function () {
    test(3, 2, 1826);
  });
});
