const { Router } = require('express');
const { walletController } = require('../controllers');

const walletRouter = Router();

walletRouter.get('/', walletController.getWalletData);

module.exports = walletRouter;