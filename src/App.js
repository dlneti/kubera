import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// FA icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// Pages
import Portfolio from './components/portfolio/Portfolio'
import Address from './components/portfolio/Address'

// FA icons
library.add(faTimes)


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Portfolio} />
        <Route path="/:address" exact component={Address} />
      </Switch>
    </Router>
  )
}

export default App
