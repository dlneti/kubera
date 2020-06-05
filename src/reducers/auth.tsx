import {
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_REQUEST,
    VERIFY_REQUEST,
    VERIFY_SUCCESS
} from "../actions/auth";
import { AuthState } from "./types";
import { AnyAction } from "redux";


const initialState: AuthState = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    verifyingError: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    user: {},
};

const auth = (state = initialState, action: AnyAction): typeof initialState => {
    // console.log(action)
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                // user: {}
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: true
            }

        case VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
                verifyingError: false
            }
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false,
            }
        default:
            return state;
    }
}


export default auth