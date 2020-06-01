import React, { useEffect } from 'react';
import axios from 'axios';

import plus from '../../../../assets/dashboard/plus.svg';
import { useDispatch, useSelector } from 'react-redux';
import { requestStreamOpen, requestStreamClose } from '../../../../actions/app';
import fetcher from '../../../../lib/fetcher';

const Watching = () => {
    const dispatch = useDispatch();
    const { data: streamData } = useSelector(state => state.stream)
    const tickers = [
        "bnbusdt",
        "btcusdt",
        "ethusdt",
    ].map(ticker => ticker)
    const tickersQuery = tickers.map(ticker => `${ticker}@ticker`).join("/")

    useEffect(() => {
        // request open stream
        dispatch(requestStreamOpen(tickersQuery));

        return () => {
            dispatch(requestStreamClose());
        }
    }, [])

    // dev
    const onClick = () => {
        dispatch(requestStreamClose());
    }

    return (
        <div className="watching">
            <div className="heading">
                <span>watching</span>
                <button className="add" onClick={onClick}>
                    <img src={plus} alt="Add button" />
                </button>
            </div>
            <div className="card-items">
                <div className="heading">
                    <span>pair</span>
                    <span>price</span>
                    <span>change (24h)</span>
                </div>
                {
                    tickers.map(ticker => <WatchingItem key={ticker} ticker={ticker} data={streamData[ticker.toUpperCase()] || {}}/>)
                }
            </div>

        </div>
    )
};

const WatchingItem = ({ticker, data}) => {
    const color = data.P < 0 ? "red" : "green";
    return (
        <div>
            <span className="pair">{ticker.toUpperCase()}</span>
            <span className="price">{data.c || ""}</span>
            <span className={`change ${color}`}>{data.P ? `${data.P} %` : ""}</span>
        </div>
    )
}

export default Watching;