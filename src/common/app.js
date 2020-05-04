export const mockData = {
    addresses: {
        "0x29b4B90B7187538A0f4e4808237E656071feaDc5": {
            "address": "0x29b4B90B7187538A0f4e4808237E656071feaDc5",
            "eth_balance": 0.016771357850043373,
            "eth_balance_fiat": 3.037638581149816,
            "tokens": [{
                "token_name": "BTRN",
                "balance": 5000.0,
                "balance_fiat": 0.4472566136535
            }, {
                "token_name": "Confido Token",
                "balance": 98.0,
                "balance_fiat": false
            }, {
                "token_name": "Brapper Gold",
                "balance": 36593333.0,
                "balance_fiat": false
            }, {
                "token_name": "Mero Currency",
                "balance": 99.9,
                "balance_fiat": false
            }, {
                "token_name": "Zuck Bucks",
                "balance": 9.98e-16,
                "balance_fiat": false
            }, {
                "token_name": "Devery.io",
                "balance": 31365.77341848374,
                "balance_fiat": 54.40049454816909
            }, {
                "token_name": "BRAPPER",
                "balance": 36593333.326680005,
                "balance_fiat": false
            }, {
                "token_name": "Jibrel Network Token",
                "balance": 7.398210348,
                "balance_fiat": 0.2234345735124304
            }, {
                "token_name": "Ink Protocol",
                "balance": 35.7288797010349,
                "balance_fiat": 0.018702725471438107
            }, {
                "token_name": "Cindicator Token",
                "balance": 36.33,
                "balance_fiat": 0.2042357590177128
            }]
        },
        "0x917a1A4a70bD3246314FBf9ba80507eaB7aF105A": {
            "address": "0x917a1A4a70bD3246314FBf9ba80507eaB7aF105A",
            "eth_balance": 0.008209758,
            "eth_balance_fiat": 1.486956385146767,
            "tokens": [{
                "token_name": "AfterShock",
                "balance": 990.6156789959356,
                "balance_fiat": false
            }, {
                "token_name": "AfterShock V2",
                "balance": 1008.00024174229,
                "balance_fiat": false
            }, {
                "token_name": "Mero Currency",
                "balance": 99.9,
                "balance_fiat": false
            }, {
                "token_name": "Zuck Bucks",
                "balance": 2e-18,
                "balance_fiat": false
            }, {
                "token_name": "ButtCoin",
                "balance": 9.8e-09,
                "balance_fiat": false
            }, {
                "token_name": "BRAPPER",
                "balance": 69696.0,
                "balance_fiat": false
            }]
        },
        "0x8470e6982B8a031440258d0ca395CFdeC6bD43f8": {
            "address": "0x8470e6982B8a031440258d0ca395CFdeC6bD43f8",
            "eth_balance": 0.016170687164860184,
            "eth_balance_fiat": 2.9288447396378463,
            "tokens": [{
                "token_name": "Parachute",
                "balance": 8604.338855421687,
                "balance_fiat": 3.0550713381531325
            }, {
                "token_name": "LITION",
                "balance": 893.02600172874,
                "balance_fiat": 41.08698158102774
            }]
        }
    }
}

export const objectToQueryString = obj => {
    return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
  }