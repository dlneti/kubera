import React from 'react';
import { useSelector } from 'react-redux';
import Balance from './Balance.js';

const BalanceTotal = () => {
    const { total } = useSelector(state => state.app.portfolio_data.balance)
    return (
        <Balance crypto={total.eth} fiat={total.fiat} />
    )
}  

export default BalanceTotal;


