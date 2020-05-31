import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk' // middleware for promises

import { verifyAuth } from '../actions/auth';

import { logger, stream } from '../middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  thunk,
  logger,
  stream,
];


const configureStore = persistedState => {
  const store = createStore(
    rootReducer,
    // persistedState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
  store.dispatch(verifyAuth());   // verify auth on first load
  return store;
}


export default configureStore
