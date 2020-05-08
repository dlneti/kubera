import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk' // middleware for promises

import { verifyAuth } from '../actions/auth';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const configureStore = persistedState => {
  const store = createStore(
    rootReducer,
    // persistedState,
    composeEnhancers(applyMiddleware(thunk))
  )
  store.dispatch(verifyAuth());
  return store;
}


export default configureStore
