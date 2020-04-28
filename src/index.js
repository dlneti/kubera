import React from 'react'
import { render } from 'react-dom'

import App from './App.js'



// Assets
import './common/app.scss'

// import 'bootstrap/scss/bootstrap.scss';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

render (
  <App />,
  document.getElementById('root')
)
