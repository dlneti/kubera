import React from 'react';
import { useSelector } from 'react-redux';
import Balance from './Balance.js';

const BalanceWallet = props => {
    const { eth_balance_fiat, token_balance_fiat } = useSelector(state => state.portfolio_data.wallets[props.address])

    return (
        <Balance crypto={eth_balance_fiat} fiat={token_balance_fiat} />
    )
}  

export default BalanceWallet;