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

import TaskFactory from '../task';
import MySegmentsUpdater from '../updater/MySegments';
import onSplitsArrivedFactory from './onSplitsArrivedFactory';

/**
 * Incremental updater to be used to share data in the browser.
 */
const PartialBrowserProducer = (context) => {
  const settings = context.get(context.constants.SETTINGS);
  const { splits: splitsEventEmitter } = context.get(context.constants.READINESS);
  
  const segmentsUpdater = MySegmentsUpdater(context);
  const segmentsUpdaterTask = TaskFactory(segmentsUpdater, settings.scheduler.segmentsRefreshRate);

  const onSplitsArrived = onSplitsArrivedFactory(segmentsUpdaterTask, context);
  
  splitsEventEmitter.on(splitsEventEmitter.SDK_SPLITS_ARRIVED, onSplitsArrived);

  return segmentsUpdaterTask;
};

export default PartialBrowserProducer;