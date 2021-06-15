import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Covid19API } from './Covid19API';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Covid19API />
  </Provider>,
  document.getElementById('root'),
);
