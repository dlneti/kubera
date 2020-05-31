const axios = require('axios');
const { db } = require('../admin');
const { settings, mockData } = require('../lib/config.js');

const WEI = 1e+18
const API_KEY = "freekey";
const API_URL = "https://api.ethplorer.io";

const CACHE_TIME = 1000 * 60 * 60 * 2;

const getWalletData = async (req, res) => {

    const { user } = req;

    // get current user
    console.time('getUser');
    const userData = await _getUserData(user.uid);
    console.timeEnd('getUser');
    // console.log(userData)
    
    // if now - last cache time is less then specified time period (5 min)
    // use cached data instead, this way we dont spam the API
    // if (true) {     // dev
    if (new Date() - userData.cache_time.toDate() <= CACHE_TIME) {
        console.log("Returning cached data!")
        res.status(200).send(userData.cached_data);
        return;
    }

    // load data from 3rd party
    console.time("fetchData")
    const data = await _fetchData(userData.wallets.eth);
    console.timeEnd("fetchData")

    console.time('transformData');
    // transform data to our desired structure
    const transformedData = _transformData(data);
    console.timeEnd('transformData');


    res.status(200).send(transformedData);

    // save cached data to db:
    const userRef = db.collection('users').doc('k5B4dShjINWYb8T1uwblZcnipqb2')
    const update = await userRef.update({
        cached_data: transformedData,
        cache_time: new Date()
    });
    console.log(update);

}

const _fetchData = async addresses => {
    const promises = addresses.map(wallet => _fetchOne(wallet));

    const _fetchAddrs = await Promise.all(promises);
    const addrsData = _fetchAddrs.map(addr => addr.data)

    return addrsData;
}

const _fetchOne = id => {
    console.log(`Fetching address: ${id}`);
    return axios.get(`${API_URL}/getAddressInfo/${id}`, {
        params: { apiKey: API_KEY }
    })
}

const _fetchMockData = () => {
    return mockData;
}

const _getUserData = async id => {
    try {
        const user = await db.collection('users').doc(`${id}`).get();
        return user.data();
    } catch (err) {
        console.log(err);
        return {};
    }
}


const _transformData = data => {
    // console.log(data);

    // init template for transformedData structure
    let transformedData = {
        balance: _getBalanceTemplate(),
        wallets: {}
    };

    data.forEach(wallet => {
        // let { wallet } = element;
        let { address, tokens } = wallet;
        let { balance } = wallet.ETH;
        let eth_rate  = wallet.ETH.price.rate;

        // init template for transformed wallet structure
        let transformedWallet = {
            balance: _getBalanceTemplate(),
            tokens: [],
        };

        // calculate initial balances
        let eth_balance_fiat = balance * eth_rate;

        // set eth and fiat balances of this address for total and address balance, we know them immediatelly
        transformedData.balance.eth.eth = balance;
        transformedData.balance.eth.fiat = eth_balance_fiat;

        transformedWallet.balance.eth.eth = balance;
        transformedWallet.balance.eth.fiat = eth_balance_fiat;


        // to know total balance, we need to know total balance of all tokens in the address
        // calculate total and token balance 
        tokens.forEach(token => {
            // calculate token balances
            let { tokenInfo, balance } = token;
            balance /= WEI;     // convert to human readable amount
            let balance_eth = false;
            let balance_fiat = false;

            // add token price to total balance and wallet balance
            // if price is available
            if (tokenInfo.price) {
                balance_fiat = balance * tokenInfo.price.rate;  // token balance in fiat
                balance_eth = balance_fiat / eth_rate;              // token balance in eth
            
                transformedData.balance.tokens.fiat += balance_fiat;
                transformedData.balance.tokens.eth += balance_fiat / eth_rate;

                transformedWallet.balance.tokens.fiat += balance_fiat;
                transformedWallet.balance.tokens.eth += balance_fiat / eth_rate;
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
        transformedWallet.balance.total.fiat += transformedWallet.balance.tokens.fiat + transformedWallet.balance.eth.fiat
        transformedWallet.balance.total.eth += transformedWallet.balance.tokens.eth + transformedWallet.balance.eth.eth

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