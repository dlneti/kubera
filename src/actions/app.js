import { admin } from "../firebase/firebase";

export const LOADING = "LOADING";
export const LOADING_COMPLETE = "LOADING_COMPLETE";
export const DATA_RECEIVED = "DATA_RECEIVED";
export const DATA_FAILED = "DATA_FAILED";
export const SET_PORTFOLIO_DATA = "SET_PORTFOLO_DATA";

export const dataReceived = payload => ({
    type: DATA_RECEIVED,
    payload: payload
})

export const loading = () => ({
    type: LOADING
})

export const dataFailed = () => ({
    type: DATA_FAILED
})

export const loadingComplete = () => ({
    type: LOADING_COMPLETE
})

export const getPortfolioData = (background = false) => async dispatch => {
    console.log("Fetching fresh data")
    // dispatch LOADING ACTION

    // if we load data in the background, we dont want to display loading actions, since data is already there, we are just refreshing it
    if (!background) {
        dispatch({ type: LOADING });
    }

    // fetch data from backend
    try {
        const uid = await admin.auth().currentUser.getIdToken();    // get auth header
        // if (!uid) throw 'badUid';

        const response = await fetch("/api/wallet", {
            headers: {'Authorization': `Bearer ${uid}`}     // set auth header to be verified in backend
        });

        const json = await response.json()
        
        // dispatch DATA_LOADED action when data is loaded
        dispatch(dataReceived(json))

        // save data to localstorage
        console.log("Saving data to localstorage");
        localStorage.setItem("portfolio_data", JSON.stringify(json))
        localStorage.setItem("last_request", new Date().getTime());
        // localStorage.setItem()
    } catch (error) {
        console.log(error)
        dispatch({
            type: DATA_FAILED
        })
    }
}

