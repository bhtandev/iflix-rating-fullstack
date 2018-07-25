import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { configureStore } from './store';

import App from './modules/App/App';

const store = configureStore();
const mountApp = document.getElementById('root');

const Index = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
      {/*<App />*/}
    </BrowserRouter>
  </Provider>
);

render(<Index />, mountApp);
