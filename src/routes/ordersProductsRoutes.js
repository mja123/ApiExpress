const express = require('express');
const OrdersProducts = require('./../services/ordersProductsService');
const { ordersProductsCreate, ordersProductsFind, ordersProductsPut, ordersProductsPatch } = require('./../validators/ordersProducstSchema');
const validatorHandler = require('./../middlewares/validators');

const router = express.Router();
const service = new OrdersProducts();

router.get('/', async (req, res, next) => {
  try {
    const items = await service.get();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(ordersProductsCreate, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newItem = await service.create(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
