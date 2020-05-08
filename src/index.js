import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App.js'
import configureStore from './store'


// Assets
import './common/app.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min';

// console.log(store)

const store = configureStore();

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
