const express = require('express');
const { walletRouter } = require('./routes');

const api = express();

api.use('/wallet', walletRouter);

module.exports = api;