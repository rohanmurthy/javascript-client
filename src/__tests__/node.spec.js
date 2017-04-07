// @flow

'use strict';

const tape = require('tape-catch');
const SplitFactory = require('../');

tape('NodeJS E2E', function (assert) {
  const config = {
    core: {
      authorizationKey: '5i7avi2rpj8i7qg99fhmc38244kcineavla0'
    },
    scheduler: {
      featuresRefreshRate: 15,
      segmentsRefreshRate: 15
    },
    urls: {
      sdk: 'https://sdk-aws-staging.split.io/api',
      events: 'https://events-aws-staging.split.io/api'
    }
  };
  const factory = SplitFactory(config);
  const client = factory.client();

  client.on(client.Event.SDK_READY, function () {
    assert.comment('QA User');
    assert.equal(client.getTreatment('qa-user', 'always-off'), 'off');
    assert.equal(client.getTreatment('qa-user', 'always-on'), 'on');
    assert.equal(client.getTreatment('qa-user', 'on-if-in-segment-qa'), 'on');
    assert.equal(client.getTreatment('qa-user', 'on-if-in-segment-qc'), 'off');

    assert.deepEqual(client.getTreatments('qa-user', [
      'always-off', 'always-on', 'on-if-in-segment-qa', 'on-if-in-segment-qc'
    ]), {
      'always-off': 'off',
      'always-on': 'on',
      'on-if-in-segment-qa': 'on',
      'on-if-in-segment-qc': 'off'
    });

    assert.comment('QC User');
    assert.equal(client.getTreatment('qc-user', 'always-off'), 'off');
    assert.equal(client.getTreatment('qc-user', 'always-on'), 'on');
    assert.equal(client.getTreatment('qc-user', 'on-if-in-segment-qa'), 'off');
    assert.equal(client.getTreatment('qc-user', 'on-if-in-segment-qc'), 'on');

    assert.deepEqual(client.getTreatments('qc-user', [
      'always-off', 'always-on', 'on-if-in-segment-qa', 'on-if-in-segment-qc'
    ]), {
      'always-off': 'off',
      'always-on': 'on',
      'on-if-in-segment-qa': 'off',
      'on-if-in-segment-qc': 'on'
    });

    client.destroy();

    assert.end();
  });

});
