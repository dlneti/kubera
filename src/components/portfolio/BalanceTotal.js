import React from 'react';
import { useSelector } from 'react-redux';
import Balance from './Balance.js';

const BalanceTotal = () => {
    const { total_balance_eth, total_balance_fiat } = useSelector(state => state.portfolio_data)

    return (
        <Balance crypto={total_balance_eth} fiat={total_balance_fiat} />
    )
}  

export default BalanceTotal;


