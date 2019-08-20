/**
 * Com o emulador Android, Genymotion, para o Reactotron funcionar precisa
 * redirecionar a porta 9090.
 *
 * comando do terminal:
 * adb reverse tcp:9090 tcp:9090
 *
 */

import React from 'react';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';
import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
};

export default App;
