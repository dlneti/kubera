const { Router } = require('express');
const { walletController: {getWalletData} } = require('../controllers');

const walletRouter = Router();

walletRouter.get('/', getWalletData);

module.exports = walletRouter;