import { app as actions } from '../actions'
import { SET_PORTFOLIO_DATA, LOADING_COMPLETE } from '../actions/app';
const { DATA_RECEIVED, LOADING, DATA_FAILED } = actions;

// initial state of app, fallback on cached data in localStorage for persistence
const initialState = {
    current_user: 1,
    portfolio_data: JSON.parse(localStorage.getItem("portfolio_data")) || {},
    loading: true,
    has_errors: false,
    last_request: +localStorage.getItem("last_request") || null,
}

const app = (state = initialState, action)  => {
//   console.log(action.type)
  switch (action.type) {
    case LOADING:
        return {...state, loading: true}
    case LOADING_COMPLETE:
        return {...state, loading: false}
    case DATA_RECEIVED:
        return {...state, portfolio_data: {...action.payload}, loading: false, last_request: new Date()}
    case DATA_FAILED:
        return {...state, hasErrors: true}
    default:
      return state;
  }
}

export default app
