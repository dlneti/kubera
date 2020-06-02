import React from 'react';

import plus from '../../../../assets/dashboard/plus.svg';
import { useSelector, DefaultRootState } from 'react-redux';
import { parseAmount } from '../../../../lib/helpers';
import Loading from '../../../Loaders/Loading';
import { RootState } from '../../../../reducers';
import { Wallet } from '../../../../reducers/types';

// type Address = {

// };

const Addrs = () => {
    const { wallets } = useSelector((state: RootState) => state.app.portfolio_data);
    const { loading } = useSelector((state: RootState) => state.app);
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
                    Object.keys(wallets).map((address: string) => {
                        const addrData = {...wallets[address]}
                        return ( <AddrItem 
                                addr={{addrData, address}}
                                key={address}
                            />
                        )
                    })
                }
                
            </div>
        </div>
    )
}


type AddrItemProps = {
    addr: {
        addrData: Wallet;
        address: string;
    };
};

const AddrItem: React.FC<AddrItemProps> = ({ addr }) => {
    return (
        <div>
            <div className="address-heading">
                { addr.address }
            </div>
            <div className="address-content">
                <AddressSectionEth balance={addr.addrData.balance.eth} />
                <AddressSectionTokens balance={addr.addrData.balance.tokens} tokens={addr.addrData.tokens} />
            </div>
        </div>
    ) 
}

type BalanceAmountProps = {
    amount: number;
    locale: number;
    icon: string;
    type: string;
};

const BalanceAmount: React.FC<BalanceAmountProps> = ({amount, locale, icon, type}) => {
    const balance: string[] = parseAmount(amount, locale);
    return (
        <div className={`balance-${type}`}>
            <span>{icon}</span>
            <div>{balance[0]}{balance.length > 1 && (<small>{`.${balance[1]}`}</small>)}</div>
        </div>
    )
}


type AddressSectionProps = {
    balance: {[key: string]: number;};
    tokens?: [];
};

const AddressSectionTokens: React.FC<AddressSectionProps> = ({balance, tokens}) => {
    return (
        <div className="tokens">
            <div className="heading">
                {`TOKENS (${tokens!.length})`}
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


const AddressSectionEth: React.FC<AddressSectionProps> = ({balance}) => {
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