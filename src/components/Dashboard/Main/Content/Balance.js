import React from 'react';

import dollar from '../../../../assets/dashboard/dollar.svg';
import ethereum from '../../../../assets/dashboard/ethereum.svg';
import bitcoin from '../../../../assets/dashboard/bitcoin.svg';
import { useSelector } from 'react-redux';
import { capitalize, parseAmount } from '../../../../lib/helpers';
import Loading from '../../../Loaders/Loading';

const Balance = () => {
    const { balance } = useSelector(state => state.app.portfolio_data);
    const { loading } = useSelector(state => state.app);
    console.log({loading, balance})

    return ( 
        <div className="balance">
            <div className="heading">balance</div>
            <div className="card-items">
                {loading && <Loading />}
                {!loading && 
                    <>
                        <BalanceItem balances={balance.total} locale={2} icon={{icon: dollar, alt: "dollar"}}/>
                        <BalanceItem balances={balance.eth} locale={8} icon={{icon: ethereum, alt: "ethereum"}}/>
                        <BalanceItem balances={balance.tokens} locale={8} icon={{icon: bitcoin, alt: "bitcoin"}}/>
                    </>
                }
            </div>
        </div>
    )
}

const BalanceItem = ({ balances, locale, icon }) => {
    const balanceFiat = parseAmount(balances.fiat, locale);
    const balanceEth = parseAmount(balances.eth, locale);
    return (
        <div>
            <img src={icon.icon} alt={`${capitalize(icon.alt)} symbol`}/>
            <div className="amount">
                {balanceFiat[0]}.<small>{balanceFiat[1]}</small>
            </div>
        </div>
    )
}

export default Balance;