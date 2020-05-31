const express = require('express');
// const cors = require('cors')({ origin: true });
const cors = require('cors')();
const { walletRouter, metaRouter } = require('./routes');
const { validateFirebaseIdToken } = require('./middleware');

const api = express();

// api.use(cors);
api.use(validateFirebaseIdToken);       // firebase auth


api.use('/wallet', walletRouter);
api.use('/meta', metaRouter);

module.exports = api;