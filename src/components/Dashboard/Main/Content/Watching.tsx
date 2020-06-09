import React, { useEffect, useState, useRef } from 'react';

import plus from '../../../../assets/dashboard/plus.svg';
import trash from '../../../../assets/dashboard/trash.svg';
import { useDispatch, useSelector } from 'react-redux';
import { requestStreamOpen, requestStreamClose, updateWatching } from '../../../../actions/app';
import { RootState } from '../../../../reducers';
import { parseAmount } from '../../../../lib/helpers';
import { SymbolArr, Symbol, StreamData } from '../../../../reducers/types';

const Watching = () => {
    const dispatch = useDispatch();
    const { data: streamData } = useSelector((state: RootState) => state.stream);
    const [ modalHidden, toggleModal ] = useState(true);
    const { user_data: { watching } } = useSelector((state: RootState) => state.app);
    const tickersQuery = watching.map((ticker: string) => `${ticker.toLowerCase()}@ticker`).join("/");
    
    useEffect(() => {
        // console.log({watching})
        // request open stream
        dispatch(requestStreamOpen(tickersQuery));

        // bind evt listeners
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            dispatch(requestStreamClose());
        }
    }, [])

    // toggle modal handler
    const onClick = () => {
        toggleModal(!modalHidden);
    }

    // close modal on ESC
    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
            toggleModal(true);
        }
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
                    <button className="remove hidden"></button>
                </div>
                {
                    watching.map((ticker: string) => <WatchingItem
                            key={ticker}
                            ticker={ticker}
                            data={streamData[ticker.toUpperCase()] || {}}
                            modalHandler={onClick}
                        />
                    )
                }
            </div>
            <SymbolSearch hidden={modalHidden} modalHandler={onClick}/>

        </div>
    )
};

type WatchingItemProps = {
    ticker: string;
    data: Record<string, any>;
    modalHandler: () => void;
};

const WatchingItem: React.FC<WatchingItemProps> = ({ticker, data}) => {
    const dispatch = useDispatch();
    // const removeButton = useRef<HTMLButtonElement>(null)
    const itemRef = useRef<HTMLDivElement>(null)
    const [ hidden, toggleHidden ] = useState(true);

    const color = data.P < 0 ? "red" : "green";
    const price = data.c ? parseAmount(+data.c, 8).join('.') : "";

    const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        dispatch(updateWatching(ticker.toUpperCase(), false));
    }

    // useEffect(() => {

    // }, [])

    const handleMouseEnter = () => {
        toggleHidden(false);
    }
    const handleMouseLeave = () => {
        toggleHidden(true);
    }

    // TODO: show remove button only on hover
    return (
        <div ref={itemRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <span className="pair">{ticker.toUpperCase()}</span>
            <span className="price">{price}</span>
            <span className={`change ${color}`}>{data.P ? `${data.P} %` : ""}</span>
            <button className={hidden ? 'hidden remove' : 'remove'} onClick={handleClick}>
                <img src={trash} alt={`remove ${ticker}`}/>
            </button>
        </div>
    )
}

type SymbolSearchProps = {
    hidden: boolean;
    modalHandler: () => void;
};

const SymbolSearch: React.FC<SymbolSearchProps> = ({ hidden, modalHandler }) => {
    const { symbols: originalSymbols } = useSelector((state: RootState) => state.app);
    const [ symbols, setSymbols ] = useState<SymbolArr>(originalSymbols);
    const [ firstRender, setFirstRender] = useState(true);
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mainRef.current?.addEventListener('animationend', handleAnimation);

        // cleanup
        return () => {  
            mainRef.current?.removeEventListener('animationend', handleAnimation);
        }
    }, [])

    const handleAnimation = (e: AnimationEvent) => {
        // console.log(e)
        const target = e.target as HTMLDivElement;
        switch (e.animationName) {
            case "fadeOutRight":
                    target.classList.add("hidden")
                break;
            case "fadeInRight":
                    target.classList.remove("hidden")
                break;
            default:
                break;
        };
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let search = originalSymbols.filter((symbol) => {
            let rgx = new RegExp(`${e.target.value}`, 'i');
            let match = symbol.symbol.match(rgx);
            if (match === null) return false;
            return match.length > 0;
        })
        setSymbols(search)
    }

    const className = hidden ? "hidden": "";
    return (
        <div className={`symbol-search ${className}`} ref={mainRef}>
            <input type="text" placeholder="Search for pair" onChange={handleChange} />
            <div className="symbols">
                {symbols.map(symbol => {
                    return ( <SymbolElement key={symbol.symbol} symbol={symbol} modalHandler={modalHandler}/> )
                })}
            </div>
        </div>
    )
}


type SymbolItemProps = {
    symbol: Symbol;
    modalHandler: () => void;
};

const SymbolElement: React.FC<SymbolItemProps> = ({symbol, modalHandler}) => {
    const dispatch = useDispatch();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(updateWatching(symbol.symbol));
        modalHandler();  // toggle modal
    }
    return (
        <div data-symbol={symbol.symbol}>
            <span>{symbol.symbol}</span>
            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default Watching;