import { app } from '../actions';
import { parseTickerFromDataFrame } from '../lib/helpers';
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

let socket = null;

const onOpen = ({ dispatch }) => (inc) => {
    console.log(inc);
}
const onClose = ({ dispatch }) => (inc) => {
    console.log("Closing stream");
    console.log(inc);
}
const onError = ({ dispatch }) => (inc) => {
    console.log("Error");
    console.log(inc);
}

const onMessage = ({ dispatch }) => ({data}) => {
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

const binanceStream = store => next => action => {
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
                socket.close();
        default:
            return next(action);
            break;
    }
}

export default binanceStream;