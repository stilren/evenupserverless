import React from 'react';
import { render } from 'react-dom'
import './index.css';
import router from './router'
import { Provider } from 'react-redux';
import store from './store'

render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById('root')
);
