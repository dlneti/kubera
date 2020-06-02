import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './store'

// Assets
import './common/css/dashboard.css';


declare module "*.png";

// console.log(store)
const store = configureStore();

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
