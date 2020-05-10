import React from 'react';
import { useSelector } from 'react-redux';
import Balance from './Balance.js';

const BalanceWallet = props => {
    const { total } = useSelector(state => state.app.portfolio_data.wallets[props.address].balance)

    return (
        <Balance crypto={total.eth} fiat={total.fiat} />
    )
}  

export default BalanceWallet;