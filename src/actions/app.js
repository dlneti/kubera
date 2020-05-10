import { objectToQueryString } from "../common/app"
import { admin } from "../firebase/firebase"

export const LOADING = "LOADING"
export const DATA_RECEIVED = "DATA_RECEIVED"
export const DATA_FAILED = "DATA_FAILED"

export const getData = () => async (dispatch, useState) => {

    // dispatch LOADING ACTION
    dispatch({ type: LOADING });

    // fetch data from backend
    try {
        const uid = await admin.auth().currentUser.getIdToken();    // get auth header
        // if (!uid) throw 'badUid';

        const response = await fetch("/api/wallet", {
            headers: {'Authorization': `Bearer ${uid}`}     // set auth header to be verified in backend
        });

        const json = await response.json()
        
        // dispatch DATA_LOADED action when data is loaded
        dispatch({
            type: DATA_RECEIVED,
            payload: json
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DATA_FAILED
        })
    }
}