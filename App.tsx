import React from 'react';
import logger from '@utils/logger';

import Entry from './src/Entry';

// Initialize Reactotron
if (__DEV__) {
  import('./reactotron-config').then(() => logger('Reactotron Configured'));
}

const App = () => {
  logger('ENTRY');
  return <Entry />;
};

export default App;
