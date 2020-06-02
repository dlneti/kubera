import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


// Pages
import { useSelector } from 'react-redux';
import Login from './components/Login';
import { Dashboard } from './components/Dashboard';
import { RootState } from './reducers';
import { SymbolSearch } from './components/Misc';


type Props = {
  component: React.FC;
  [key: string]: any;
}

const ProtectedRoute = ({component: C, ...rest}: Props) => {
  const { isAuthenticated, isVerifying } = useSelector((state: RootState) => state.auth);

  return (
    <Route {...rest} render={props => {
      if (isVerifying) {
        return (
          <p>Verifying...</p>
        )
      }

      if (isAuthenticated === true) {
        return <C />
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
        <ProtectedRoute path="/dev" exact component={SymbolSearch} />
      </Switch>
    </Router>
  )
}

export default App

