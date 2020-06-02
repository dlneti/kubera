import { app as actions } from '../actions';
import { AnyAction } from 'redux';
import { StreamRootState } from './types';
const {
    STREAM_OPEN,
    STREAM_CONNECTING,
    // STREAM_CLOSING,
    STREAM_CLOSED,
    STREAM_DATA
} = actions;

const initialState: StreamRootState = {
    data: {},
    loading: true,
    open: false
}

const stream = (state = initialState, action: AnyAction): typeof initialState => {
    switch (action.type) {
        case STREAM_CONNECTING:
            return {...state, loading: true, open: true}
        case STREAM_CLOSED:
            return {...state, loading: false, open: false}
        case STREAM_OPEN:
            return {...state, loading: false, open: true}
        case STREAM_DATA:
            // console.log(action);
            const { payload } = action;
            return {...state, data: {...state.data, [payload.ticker]: payload.data}}
        default:
            return {...state}
    }
}

export default stream;