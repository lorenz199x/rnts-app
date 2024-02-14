import React from 'react';
import Utils from '@utils/index';
import logger from '@utils/logger';

import Entry from './src/Entry';

// Initialize Reactotron
if (__DEV__) {
  import('./reactotron-config').then(() => Utils.logger('Reactotron Configured'));
}

const App = () => {
  logger('ENTRY');
  return <Entry />;
};

export default App;
