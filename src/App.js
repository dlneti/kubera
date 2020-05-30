import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


// FA icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// Pages
// import { Portfolio } from './components/Portfolio'
// import Address from './components/portfolio/Address'
import { useSelector } from 'react-redux';
import Login from './components/Login';
import { LayeredCircle } from './components/Spinners';
import { Stream } from './components/Stream';
import { Dashboard } from './components/Dashboard';


// FA icons
library.add(faTimes)

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isVerifying } = useSelector(state => state.auth);

  return (
    <Route {...rest} render={props => {
      if (isVerifying) {
        return (
          <LayeredCircle size="xl"/>
        )
      }

      if (isAuthenticated === true) {
        return <Component {...props} />
      } 

      return <Redirect to='/login' />
      
      }} 
    />
  )
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <ProtectedRoute path="/" exact component={Dashboard} />
        {/* <ProtectedRoute path="/:address" exact component={Address} /> */}
        <ProtectedRoute path="/stream" exact component={Stream} />
        {/* <ProtectedRoute path="/dashboard" exact component={Dashboard} /> */}
      </Switch>
    </Router>
  )
}

export default App

