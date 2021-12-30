const express = require('express');
const productsRouter = require('./produtsRoute');
const usersRouter = require('./usersRoute');
const customersRouter = require('./customerRoutes');
const categoriesRouter = require('./categoryRoutes');
const ordersRouter = require('./orderRoutes');
const ordersProductsRouter = require('./ordersProductsRoutes');

const routerApi = (app) => {
  //That's how I can use a mother route, who is share with all of the routes
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/category', categoriesRouter);
  router.use('/orders', ordersRouter);
  router.use('/items', ordersProductsRouter)
};

module.exports = routerApi;
