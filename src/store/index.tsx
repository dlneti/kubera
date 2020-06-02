import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers'
import thunk from 'redux-thunk' // middleware for promises

import { verifyAuth } from '../actions/auth';

import { logger, stream } from '../middleware';
import { useDispatch } from 'react-redux';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  thunk,
  logger,
  stream,
];

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
  store.dispatch<any>(verifyAuth());   // verify auth on first load
  return store;
}

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(...middlewares))
// )


export default configureStore
