import { objectToQueryString } from "../common/app"

export const LOADING = "LOADING"
export const DATA_RECEIVED = "DATA_RECEIVED"
export const DATA_FAILED = "DATA_FAILED"

const CACHE_TIME = 60 * 5 * 1000 // 5 min in ms

export const getData = () => async (dispatch, useState) => {
    console.log("get data")

    // load data only if cached period ended

    const state = useState()

    if (new Date() - state.last_request <= CACHE_TIME) {
        console.log(new Date() - state.last_request)
        console.log("Skipping request, cache time not over yet!")
        return
    }


    // dispatch LOADING ACTION
    dispatch({
        type: LOADING
    })

    try {
        // get data
        const params = {
            user_id: 1
        }
        const url = `/portfolio?${objectToQueryString(params)}`
        // console.log(url)

        const response = await fetch(url, {
            method: 'GET',
        })

        console.log(response.status)
        const json = await response.json()
        console.log(json)

        // handle data

        // dispatch DATA_LOADED action when data is loaded
        dispatch({
            type: DATA_RECEIVED,
            payload: handleResponse(json)
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DATA_FAILED
        })
    }
}

const handleResponse = response => {
    let data = {...response} // clone original response

    // calculate total token balance
    for (let wallet in response.wallets) {
        let total_wallet_balance = response.wallets[wallet].tokens.map(a => a.balance_fiat).reduce((a,b) => a + b)
        data.wallets[wallet].token_balance_fiat = total_wallet_balance
    }

    return data // return modified response

}