import React, { useEffect, useState, useRef } from 'react';

const Stream = () => {
    const wsUrl = "wss://stream.binance.com:9443/ws";

    const [stream, _setStream] = useState([])
    const [dataCount, setDataCount] = useState(0)

    const streamRef = useRef(stream);
    const setStream = val => {
        _setStream(val);
        streamRef.current = val;
    }

    useEffect(() => {
        console.log("Connecting to websocket");
        const ws = new WebSocket(`${wsUrl}/bnbusdt@miniTicker`);
        console.log("Connection successful");   // this is wrong, connection is successful on onOpen message

        ws.addEventListener('message', ({ data }) => {

            // console.log(streamRef);

            setStream(streamRef.current.concat([JSON.parse(data)]));
        })

        ws.addEventListener('ping', () => {
            console.log("pong")
            ws.pong();
        })

        return () => {
            console.log("closing websocket")
            ws.close();
        }
    }, []);

    return (
        <div>
            <h1>Binance stream</h1>
            <br />

            <ul>
                {console.log(stream, dataCount)}
                {   
                    stream.map((e, i) => (
                        <li key={i}>
                            {`${e.s} ${e.c}`}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Stream;