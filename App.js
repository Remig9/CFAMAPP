import React, {useEffect, useState} from 'react';
import {store, persistor} from './app/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Providers from './app/navigation/Providers';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
import {publicToken, config, version} from './app/helpers/config';
import Version from './app/screens/version/Version';
const App = () => {
  const [appVersion, setAppVersion] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    getAppVersion();
  }, []);
  const getAppVersion = async () => {
    await axios
      .get(config.version, {
        headers: {
          publicToken: publicToken.token,
        },
      })
      .then((res) => {
        console.warn('app verison', res.data);
        setPageLoading(false);
        setAppVersion(res.data.version);
      })
      .catch((err) => {
        console.warn('home error', err);
      });
  };
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {appVersion > version.number ? <Version /> : <Providers />}
      </PersistGate>
    </Provider>
  );
};
export default App;
store.subscribe(() => {
  console.warn('Store Change: ', store.getState());
});
