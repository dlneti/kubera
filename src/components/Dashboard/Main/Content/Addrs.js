import React from 'react';

import plus from '../../../../assets/dashboard/plus.svg';
import { useSelector } from 'react-redux';
import { parseAmount } from '../../../../lib/helpers';
import Loading from '../../../Loaders/Loading';

const Addrs = () => {
    const { wallets } = useSelector(state => state.app.portfolio_data);
    const { loading } = useSelector(state => state.app);
    return (
        <div className="addrs">
            <div className="heading">
                <span>live assets</span>
                <button className="add">
                    <img src={plus} alt="Add button" />
                </button>
            </div>
            <div className="addresses-container">
                { loading && <Loading />}
                { !loading &&
                    Object.keys(wallets).map(address => (
                        <AddrItem 
                            addr={{...wallets[address], address: address}}
                            key={address}
                        />
                    ))
                }
                
            </div>
        </div>
    )
}


const AddrItem = ({ addr }) => {
    return (
        <div>
            <div className="address-heading">
                { addr.address }
            </div>
            <div className="address-content">
                <AddressSectionEth balance={addr.balance.eth} />
                <AddressSectionTokens balance={addr.balance.tokens} tokens={addr.tokens} />
            </div>
        </div>
    ) 
}

const BalanceAmount = ({amount, locale, icon, type}) => {
    const balance = parseAmount(amount, locale);
    return (
        <div className={`balance-${type}`}>
            <span>{icon}</span>
            <div>{balance[0]}{balance.length > 1 && (<small>{`.${balance[1]}`}</small>)}</div>
        </div>
    )
}

const AddressSectionTokens = ({balance, tokens}) => {
    return (
        <div className="tokens">
            <div className="heading">
                {`TOKENS (${tokens.length})`}
            </div>
            <BalanceAmount 
                amount={balance.eth}
                locale={8}
                icon="Ξ"
                type="crypto"
            />
            <BalanceAmount 
                amount={balance.fiat}
                locale={2}
                icon="$"
                type="fiat"
            />
        </div>
    )
}

const AddressSectionEth = ({balance}) => {
    return (
        <div className="eth">
            <div className="heading">
                ETH
            </div>
            <BalanceAmount 
                amount={balance.eth}
                locale={8}
                icon="Ξ"
                type="crypto"
            />
            <BalanceAmount 
                amount={balance.fiat}
                locale={2}
                icon="$"
                type="fiat"
            />
        </div>
    )
}

export default Addrs;