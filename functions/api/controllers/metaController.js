const axios = require('axios');

const API_URL = 'https://api.binance.com/api/v3'

const getWatching = async (req, res) => {
    console.log(req.query);
    if (!req.query.hasOwnProperty('symbol')) {
        res.status(400).send("Bad query");
        return;
    }

    const symbols = req.query.symbol.split(',');
    
    // console.log(symbols)
    const promises = _mapSymbolsToPromises(symbols);
    // console.log(promises[0])
    try {
        const fetchSymbols = await Promise.all(promises);
        const symbolsData = fetchSymbols.map(s => s.data);
        res.status(200).send(JSON.stringify(symbolsData))
    } catch (err) {
        console.log(err)
        res.status(400).send("Bad response from 3rd party");
    }

}

const _mapSymbolsToPromises = symbols => {
    return symbols.map(symbol => axios({
        method: 'GET',
        url: `${API_URL}/ticker/24hr`,
        params: { symbol: symbol.toUpperCase() }
    }))
}


module.exports = { getWatching };