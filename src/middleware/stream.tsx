import { app } from '../actions';
import { parseTickerFromDataFrame } from '../lib/helpers';
import { Dispatch } from 'react';
import { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { AppRootState } from '../reducers/types';
import { RootState } from '../reducers';
const {
    STREAM_OPEN,
    STREAM_CONNECTING,
    STREAM_CLOSED,
    STREAM_DATA,
    REQUEST_STREAM_OPEN,
    REQUEST_STREAM_CLOSE,
    streamData
} = app;

const STREAM_URL = "wss://stream.binance.com:9443/stream";

let socket: WebSocket | null = null;

const onOpen = ({ dispatch }: MiddlewareAPI) => (e: Event) => {
    console.log("Stream is open")
    // console.log(e)    
}
const onClose = ({ dispatch }: MiddlewareAPI) => (e: CloseEvent)  => {
    console.log("Closing stream");
    // console.log("eClosing stream");
}
const onError = ({ dispatch }: MiddlewareAPI) => (e: Event) => {
    console.log("Error");
}

const onMessage = ({ dispatch }: MiddlewareAPI) => ({data}: MessageEvent) => {
    let payload;
    try {
        payload = JSON.parse(data);
    } catch(err) {
        console.log("Error parsing incoming data frame", data);
        return; // ignore bad data frame
    }

    const ticker = parseTickerFromDataFrame(payload.stream);
    dispatch(streamData(ticker, payload.data));     // dispatch data frame to reducer
}

const binanceStream: Middleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action) => {
    switch (action.type) {
        case REQUEST_STREAM_OPEN:
            if (socket !== null) {
                console.log("Socket is live. Closing ...");
                socket.close();
            }

            let streamUrl = `${STREAM_URL}?streams=${action.url}`
            console.log(`Connecting to stream: ${streamUrl}`)
            socket = new WebSocket(streamUrl);

            socket.addEventListener('open', onOpen(store));
            socket.addEventListener('close', onClose(store));
            socket.addEventListener('message', onMessage(store));
            socket.addEventListener('error', onError(store));
            // socket.addEventListener('ping', onPing);
            break;
        
        case REQUEST_STREAM_CLOSE:
            if (socket !== null) {
                socket.close();
            } else {
                console.log("Socket already closed!")
            }
        default:
            return next(action);
            break;
    }
}

export default binanceStream;