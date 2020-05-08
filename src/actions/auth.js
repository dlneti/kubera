import { admin } from '../firebase/firebase';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    }
}

const loginSucess = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    }
}

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    }
}

const logoutSuccess = user => {
    return {
        type: LOGOUT_SUCCESS,
        user
    }
}

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    }
}

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};
  
const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};


export const loginUser = (email, password) => async dispatch => {
    dispatch(requestLogin());

    // try to login user
    try {
        const user = await admin.auth().signInWithEmailAndPassword(email, password);
        console.log(user);
        dispatch(loginSucess(user))
    } catch (err) {
        // login failed
        dispatch(loginError());
    }
}

export const logoutUser = () => async dispatch => {
    dispatch(requestLogout);

    // try to login user
    try {
        const signOut = await admin.auth().signOut();
        console.log(signOut);
        dispatch(logoutSuccess())
    } catch (err) {
        // login failed
        dispatch(logoutError());
    }
}

export const verifyAuth = () => async dispatch => {
    dispatch(verifyRequest());

    // try to login user
    await admin.auth().onAuthStateChanged(user => {
        // console.log(user)
        if (user !== null) {
            dispatch(loginSucess(user))
        }
        
        dispatch(verifySuccess())
    });

    
}