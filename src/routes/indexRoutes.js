const productsRouter = require('./produtsRoute');
const usersRouter = require('./usersRoute')
const express = require('express');

const routerApi = (app) => {
//That's how I can use a mother route, who is share with all of the routes
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;


