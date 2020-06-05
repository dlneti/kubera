import { app as actions } from '../actions'
import { SET_PORTFOLIO_DATA, LOADING_COMPLETE, SET_USER_DATA, UPDATE_WATCHING } from '../actions/app';
import { AppRootState } from './types';
import { AnyAction } from 'redux';

const { DATA_RECEIVED, LOADING, DATA_FAILED } = actions;

// initial state of app, fallback on cached data in localStorage for persistence
const initialState: AppRootState = {
    user_data: JSON.parse(localStorage.getItem("user_data") || "{}"),
    portfolio_data: JSON.parse(localStorage.getItem("portfolio_data") || "{}"),
    symbols: JSON.parse(localStorage.getItem("symbols_data") || "[]"),
    loading: true,
    has_errors: false,
    last_request: +localStorage.getItem("last_request")! || null,
}

const app = (state: AppRootState = initialState, action: AnyAction ): typeof initialState  => {
//   console.log(action.type)
  switch (action.type) {
    case LOADING:
        return {...state, loading: true}
    case LOADING_COMPLETE:
        return {...state, loading: false}
    case DATA_RECEIVED:
        return {
            ...state,
            portfolio_data: {...action.payload.walletData},
            user_data: {...action.payload.userData},
            symbols: [...action.payload.symbolsData],
            loading: false,
            last_request: new Date().getTime(),
        }
    case DATA_FAILED:
        return {...state, has_errors: true}
    case UPDATE_WATCHING:
        return {...state, user_data: {...state.user_data, watching: action.payload}}
    // case SET_USER_DATA:
    //     return {...state, user_data: action.payload}
    default:
      return state;
  }
}

export default app
