import { combineReducers } from "redux";
import app from './app';
import auth from './auth';
import stream from './stream';

export default combineReducers({ app, auth, stream })