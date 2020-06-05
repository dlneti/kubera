import { db } from "../firebase/firebase";
import fetcher from '../lib/fetcher';
import { ThunkAction } from 'redux-thunk';
import { Action, AnyAction } from 'redux';
import { RootState } from '../reducers';
import { User } from '../reducers/types';

export const LOADING = "LOADING";
export const LOADING_COMPLETE = "LOADING_COMPLETE";
export const DATA_RECEIVED = "DATA_RECEIVED";
export const DATA_FAILED = "DATA_FAILED";
export const SET_PORTFOLIO_DATA = "SET_PORTFOLO_DATA";
export const SET_USER_DATA = "SET_USER_DATA";
export const UPDATE_WATCHING = "UPDATE_WATCHING";

export const setUserData = (user: User) => ({
    type: SET_USER_DATA,
    payload: user
})

export const dataReceived = (payload: object): AnyAction => ({
    type: DATA_RECEIVED,
    payload: payload
})

export const loading = (): AnyAction => ({
    type: LOADING
})

export const dataFailed = (): AnyAction => ({
    type: DATA_FAILED
})

export const loadingComplete = (): AnyAction => ({
    type: LOADING_COMPLETE
})

export const updateWatchingState = (watching: []): AnyAction => ({
    type: UPDATE_WATCHING,
    payload: watching
})

export const updateWatching = (symbol: string, add: boolean = true): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    const { app: { user_data: user } } = getState();
    const { auth: { user: { uid } } } = getState();
    
    let newArr;
    if (add) {
        newArr = Array.from(new Set([...user.watching, symbol]));
    } else {
        newArr = user.watching.filter((item: string) => item !== symbol)
    }
    // dispatch new item to store
    dispatch(updateWatchingState(newArr));

    // update db entry
    const userRef = db.collection('users').doc(uid);
    const updateWatching = await userRef.update({watching: newArr});        // TODO: Error handling
}   


export const initData = (background = false): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
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
        const symbolsPromise = fetcher({
            url: "/api/meta/symbols"
        })
        const userPromise = _getUserData(auth.user.uid);
        const promises: Promise<any>[] = [
            walletPromise,
            userPromise,
            symbolsPromise,
        ];
        const _fetchData = await Promise.all(promises);
        const _initData: any[] = _fetchData.map((response) => response.data);
        // console.log(_initData)

        const walletData = _initData[0];
        const userData = _transformUserData(_initData[1]);
        const symbolsData = _initData[2];

        // dispatch DATA_LOADED action when data is loaded
        dispatch(dataReceived({walletData, userData, symbolsData}))

        // save data to localstorage
        localStorage.setItem("portfolio_data", JSON.stringify(walletData));
        localStorage.setItem("user_data", JSON.stringify(userData));
        localStorage.setItem("symbols_data", JSON.stringify(symbolsData));
        localStorage.setItem("last_request", JSON.stringify(new Date().getTime()));
    } catch (error) {
        console.log(error)
        dispatch({
            type: DATA_FAILED
        })
    }
}

const _getUserData = async (uid: string): Promise<{data: object | undefined}> => {
    const userRef = db.collection('users').doc(uid);
    const getUser = await userRef.get();
    return {data: getUser.data()};
}

type user = {
    watching: string[];
    wallets: {};
    username: string;
}

const _transformUserData = (userData: user) => {
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

export const streamData = (ticker: string, data: {})  => ({
    type: STREAM_DATA,
    payload: {
        ticker: ticker,
        data: data
    }
})

export const requestStreamOpen = (url: string) => ({
    type: REQUEST_STREAM_OPEN,
    url: url,
})

export const requestStreamClose = () => ({
    type: REQUEST_STREAM_CLOSE
})