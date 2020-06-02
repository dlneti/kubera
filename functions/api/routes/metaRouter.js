const { Router } = require('express');
const { metaController: {getWatching, getAllSymbols} } = require('../controllers');

const metaRouter = Router();

metaRouter.get('/watching', getWatching);
metaRouter.get('/symbols', getAllSymbols);

module.exports = metaRouter;