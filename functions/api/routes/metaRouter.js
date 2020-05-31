const { Router } = require('express');
const { metaController: {getWatching} } = require('../controllers');

const metaRouter = Router();

metaRouter.get('/watching', getWatching);

module.exports = metaRouter;