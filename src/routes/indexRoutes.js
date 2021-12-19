const express = require('express');
const productsRouter = require('./produtsRoute');
const usersRouter = require('./usersRoute');
const customersRouter = require('./customerRoutes');

const routerApi = (app) => {
//That's how I can use a mother route, who is share with all of the routes
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
}

module.exports = routerApi;


