const fetch = require('node-fetch');
const { settings, mockData } = require('../lib/config.js');

const WEI = 1e+18


const getWalletData = async (req, res) => {
    // load data from 3rd party
    let data = _fetchMockData();


    console.time('transformData');
    // transform data to our desired structure
    data = _transformData([data]);
    console.timeEnd('transformData');

    res.send({"wallet": data})
}

const _fetchData = async () => {
    const url = `${API_URL}/getAddressInfo/${address}?apiKey=freekey`

    const response = await fetch(url)
    const json = await response.json()

    return json;
}

const _fetchMockData = () => {
    return mockData;
}


const _transformData = data => {
    // console.log(data);

    // init template for transformedData structure
    let transformedData = {
        balance: _getBalanceTemplate(),
        wallets: {}

    };

    data.forEach(element => {
        let { wallet } = element;
        let { address, tokens } = wallet;
        let { balance } = wallet.ETH;
        let eth_rate  = wallet.ETH.price.rate;
        let transformedWallet = {
            balance: _getBalanceTemplate(),
            tokens: [],
        };

        // calculate initial balances

        let eth_balance_fiat = balance * eth_rate;

        // set eth balances for total balance, we know them immediatelly
        transformedData.balance.eth.eth = balance;
        transformedData.balance.eth.fiat = eth_balance_fiat;

        // seth eth balances for wallet balance
        transformedWallet.balance.eth.eth = balance;
        transformedWallet.balance.eth.fiat = eth_balance_fiat;

        // calculate total and token balance 
        tokens.forEach(token => {
            // calculate token balances
            let { tokenInfo, balance } = token;
            balance /= WEI;     // convert to human readable amount
            let balance_fiat = false;
            let balance_eth = false;

            if (tokenInfo.price) {
                balance_fiat = balance * tokenInfo.price.rate;  // token balance in fiat
                balance_eth = balance_fiat * eth_rate;              // token balance in eth
            }

            // add token price to total balance and wallet balance
            // if price is available

            if (balance_fiat) {
                transformedData.balance.tokens.fiat = balance_fiat;
                transformedData.balance.tokens.eth = balance_fiat / eth_rate;

                transformedWallet.balance.tokens.fiat = balance_fiat;
                transformedWallet.balance.tokens.eth = balance_fiat / eth_rate;
            }

            // append new transformed token to wallet
            transformedWallet.tokens.push({
                "address": tokenInfo.address,
                "token_name": tokenInfo.name,
                "token_symbol": tokenInfo.symbol,
                "balance": {
                    "amount": balance,
                    "eth": balance_eth,
                    "fiat": balance_fiat
                },
                "rate": tokenInfo.price.rate || false,
            })
        });

        // after tokens are summed we can add these values to wallet total balances
        transformedWallet.balance.total.fiat = transformedData.balance.tokens.fiat + transformedData.balance.eth.fiat
        transformedWallet.balance.total.eth = transformedData.balance.tokens.eth + transformedData.balance.eth.eth

        // add transformed wallet to portfolio data
        transformedData.wallets[address] = transformedWallet;
        
    });

    // after all wallets are processed we can add total value to portfolio total
    transformedData.balance.total.fiat = transformedData.balance.eth.fiat + transformedData.balance.tokens.fiat;
    transformedData.balance.total.eth = transformedData.balance.eth.eth + transformedData.balance.tokens.eth;

    return transformedData
} 

const _getBalanceTemplate = () => {
    return {
        total: {
            fiat: 0,
            eth: 0
        },
        eth: {
            fiat: 0,
            eth: 0
        },
        tokens: {
            fiat: 0,
            eth: 0
        }
    }
}


module.exports = {
    getWalletData: getWalletData,
};


// debug
_transformData([mockData])