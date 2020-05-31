import axios from 'axios';
import { admin, db } from "../firebase/firebase";
import fetcher from '../lib/fetcher.js';

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

export const initData = (background = false) => async (dispatch, getState) => {
    // console.log("Fetching fresh data")
    // dispatch LOADING ACTION
    const { auth } = getState();

    // if we load data in the background, we dont want to display loading actions, since data is already there, we are just refreshing it
    if (!background) {
        dispatch({ type: LOADING });
    }

    // fetch data from backend
    try {
        const walletPromise = fetcher({
            url: "/api/wallet",
        })
        const userPromise = _getUserData(auth.user.uid);
        const promises = [
            walletPromise,
            userPromise
        ];
        const _fetchData = await Promise.all(promises);
        const _initData = _fetchData.map(response => response.data);
        // console.log(_initData)

        const walletData = _initData[0];
        const userData = _transformUserData(_initData[1]);

        // dispatch DATA_LOADED action when data is loaded
        dispatch(dataReceived({walletData, userData}))

        // save data to localstorage
        localStorage.setItem("portfolio_data", JSON.stringify(walletData));
        localStorage.setItem("current_user", JSON.stringify(userData));
        localStorage.setItem("last_request", new Date().getTime());
    } catch (error) {
        console.log(error)
        dispatch({
            type: DATA_FAILED
        })
    }
}

const _getUserData = async uid => {
    const userRef = db.collection('users').doc(uid);
    const getUser = await userRef.get();
    return {data: getUser.data()};
}

const _transformUserData = userData => {
    return {
        watching: userData.watching,
        wallets: userData.wallets,
        username: userData.username
    }
}


// stream
export const STREAM_OPEN = "STREAM_OPEN";
export const STREAM_CONNECTING = "STREAM_CONNECTING";
export const STREAM_CLOSING = "STREAM_CLOSING";
export const STREAM_CLOSED = "STREAM_CLOSED";
export const STREAM_DATA = "STREAM_DATA";
export const REQUEST_STREAM_OPEN = "REQUEST_STREAM_OPEN";
export const REQUEST_STREAM_CLOSE = "REQUEST_STREAM_CLOSE";

export const streamOpen = () => ({
    type: STREAM_OPEN
})

export const streamConnecting = () => ({
    type: STREAM_CONNECTING
})

export const streamClosing = () => ({
    type: STREAM_CLOSING
})

export const streamClosed = () => ({
    type: STREAM_CLOSED
})

export const streamData = (ticker, data)  => ({
    type: STREAM_DATA,
    payload: {
        ticker: ticker,
        data: data
    }
})

export const requestStreamOpen = url => ({
    type: REQUEST_STREAM_OPEN,
    url: url,
})

export const requestStreamClose = () => ({
    type: REQUEST_STREAM_CLOSE
})