import React, { useEffect, useState } from 'react';

import plus from '../../../../assets/dashboard/plus.svg';
import { useDispatch, useSelector } from 'react-redux';
// import { useFuzzy } from 'react-use-fuzzy';
import { requestStreamOpen, requestStreamClose } from '../../../../actions/app';
import { RootState } from '../../../../reducers';
import { parseAmount } from '../../../../lib/helpers';
import { SymbolArr, Symbol } from '../../../../reducers/types';

const Watching = () => {
    const dispatch = useDispatch();
    const { data: streamData } = useSelector((state: RootState) => state.stream)
    const [modalHidden, toggleModal] = useState(true);

    // mock
    const tickers = [
        "bnbusdt",
        "btcusdt",
        "ethusdt",
    ].map(ticker => ticker)         // TODO save this to DB and fetch data from there
    // const tickers = {  } = useSelector((state: RootState) => state.app)
    const tickersQuery = tickers.map(ticker => `${ticker}@ticker`).join("/")

    useEffect(() => {
        // request open stream
        dispatch(requestStreamOpen(tickersQuery));

        return () => {
            dispatch(requestStreamClose());
        }
    }, [])

    const onClick = () => {
        toggleModal(!modalHidden);
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
            <SymbolSearch hidden={modalHidden}/>

        </div>
    )
};

type WatchingItemProps = {
    ticker: string;
    [K: string]: any;
};

const WatchingItem: React.FC<WatchingItemProps> = ({ticker, data}) => {
    const color = data.P < 0 ? "red" : "green";
    const price = data.c ? parseAmount(+data.c, 8).join('.') : "";
    return (
        <div>
            <span className="pair">{ticker.toUpperCase()}</span>
            <span className="price">{price}</span>
            <span className={`change ${color}`}>{data.P ? `${data.P} %` : ""}</span>
        </div>
    )
}

type SymbolSearchProps = {
    hidden: boolean;
};

const SymbolSearch: React.FC<SymbolSearchProps> = ({hidden}) => {
    const { symbols: originalSymbols } = useSelector((state: RootState) => state.app);
    const [ symbols, setSymbols ] = useState<SymbolArr>(originalSymbols);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let search = originalSymbols.filter((symbol) => {
            let rgx = new RegExp(`${e.target.value}`, 'i');
            let match = symbol.symbol.match(rgx);
            if (match === null) return false;
            return match.length > 0;
        })
        setSymbols(search)
    }

    return (
        <div className={`symbol-search ${hidden ? "hidden": ""}`}>
            <input type="text" placeholder="Search for pair" onChange={handleChange}/>
            <div className="symbols">
                {symbols.map(symbol => {
                    return ( <SymbolElement key={symbol.symbol} symbol={symbol} /> )
                })}
            </div>
        </div>
    )
}


type SymbolItemProps = {
    symbol: Symbol;
};

const SymbolElement: React.FC<SymbolItemProps> = ({symbol}) => {
    return (
        <div data-symbol={symbol.symbol}>
            <span>{symbol.symbol}</span>
            <button>Add</button>
        </div>
    )
}

export default Watching;