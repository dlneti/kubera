import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


// Pages
import { useSelector } from 'react-redux';
import Login from './components/Login';
import { Dashboard } from './components/Dashboard';


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isVerifying } = useSelector(state => state.auth);

  return (
    <Route {...rest} render={props => {
      if (isVerifying) {
        return (
          <p>Verifying...</p>
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
      </Switch>
    </Router>
  )
}

export default App

