import { combineReducers } from "redux";
import app from './app';
import auth from './auth';
import stream from './stream';


const rootReducer = combineReducers({ app, auth, stream })
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>