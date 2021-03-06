/**
Copyright 2016 Split Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/
import tape from 'tape-catch';
import ImpressionsCacheInMemory from '../../ImpressionsCache/InMemory';

tape('IMPRESSIONS CACHE IN MEMORY / should incrementally store values', assert => {
  const c = new ImpressionsCacheInMemory;

  c.track([0]).track([1, 2]).track([3]);

  assert.true(
    c.state().reduce((accum, e, k) => accum += e - k, 0) === 0,
    'all the items should be stored in sequential order'
  );
  assert.end();
});

tape('IMPRESSIONS CACHE IN MEMORY / should support custom toJSON method', assert => {
  const c = new ImpressionsCacheInMemory;
  const hooked = JSON.stringify(c);
  const manual = JSON.stringify(c.state());

  assert.true(hooked === manual, 'toJSON should expose the counters as an array of numbers');
  assert.end();
});
