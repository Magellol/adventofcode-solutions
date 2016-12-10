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

  it('Day 4 part 1', function () {
    test(4, 1, 185371);
  });

  it('Day 4 part 2', function () {
    test(4, 2, 984);
  });

  // The cache file is required for day 5
  // otherwise we go over the 2000ms limit mocha sets.
  it('Day 5 part 1', function () {
    test(5, 1, 'f77a0e6e');
  })

  it('Day 5 part 2', function () {
    test(5, 2, '999828ec');
  })
});
