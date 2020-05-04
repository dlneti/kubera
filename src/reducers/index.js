import { DATA_RECEIVED, LOADING, DATA_FAILED } from "../actions";

const initialState = {
    current_user: 1,
    portfolio_data: {
        total_balance_eth: 0,
        total_balance_fiat: 0,
        wallets: []
    },
    loading: false,
    has_errors: false,
    last_request: false,
}

const rootReducer = (state = initialState, action)  => {
  console.log(action.type)
  switch (action.type) {
    case LOADING:
        console.log(LOADING)
        return {...state, loading: true}
    case DATA_RECEIVED:
        return {...state, portfolio_data: {...action.payload}, loading: false, last_request: new Date()}
    case DATA_FAILED:
        return {...state, hasErrors: true}
    default:
      return state;
  }
}

export default rootReducer
