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
  // otherwise we run out of memory.
  it('Day 5 part 1', function () {
    const p = require('./day5/part1');
    return p.then(password => assert.strictEqual(password, 'f77a0e6e'));
  });

  it('Day 5 part 2', function () {
    test(5, 2, '999828ec');
  });

  it('Day 6 part 1', function () {
    test(6, 1, 'kjxfwkdh');
  });

  it('Day 6 part 2', function () {
    test(6, 2, 'xrwcsnps');
  });

  it('Day 7 part 1', function () {
    test(7, 1, 118);
  });

  it('Day 7 part 2', function () {
    test(7, 2, 260);
  });

  it('Day 8 part 1', function () {
    test(8, 1, 128);
  });

  it.skip('Day 8 part 2', function () {
    // It's more of a visual perception.
    // See day8/part2.js
  });

  it('Day 9 part 1', function () {
    test(9, 1, 183269);
  });

  it.skip('Day 9 part 2', function () {
    // Haven't had the chance to go around this problem, yet.
  });

  it('Day 10, part 1', function () {
    test(10, 1, '161');
  });

  it('Day 10 part 2', function() {
    test(10, 2, 133163);
  });
});
