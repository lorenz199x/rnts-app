// @ts-ignore
// import apisaucePlugin from 'reactotron-apisauce';
import Reactotron from 'reactotron-react-native';
// import { reactotronRedux } from 'reactotron-redux';
// import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appName = require('./app.json').name;

// Initialize Reactotron
const reactotron = Reactotron.configure({
  name: appName,
})
  // .use(reactotronRedux())
  // .use(sagaPlugin())
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: {},
    overlay: false,
  });
// .setAsyncStorageHandler(AsyncStorage)
// .use(apisaucePlugin())
// .use(reactotronRedux());
// Check if setAsyncStorageHandler exists before calling it
if (reactotron.setAsyncStorageHandler) {
  reactotron.setAsyncStorageHandler(AsyncStorage);
}

// Finally, connect Reactotron
reactotron.connect();

export default Reactotron;
