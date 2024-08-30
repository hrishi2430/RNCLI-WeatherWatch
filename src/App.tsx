import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import WeatherScreen from './screens/wheatherScreen/index';


const App = () => {
  return (
    <Provider store={store}>
      <WeatherScreen />
    </Provider>
  );
};

export default App;
