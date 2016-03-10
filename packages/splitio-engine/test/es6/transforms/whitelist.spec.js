const transform = require('../../../lib/transforms/whitelist');
const tape = require('tape');

tape('TRANSFORMS / a whitelist Array should be casted into a Set', function (assert) {
  let sample = [
    'u1',
    'u2',
    'u3'
  ];

  let sampleSet = transform(sample);

  for (let item in sample) {
    if (sampleSet.has(item)) {
      assert.fail(`Missing item ${item}`);
    }
  }

  assert.ok(true, 'Everything looks fine');
  assert.end();
});
