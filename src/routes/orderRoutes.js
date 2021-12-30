const express = require('express');
const OrderService = require('./../services/orderService');
const {
  orderFind,
  orderCreate,
} = require('./../validators/orderSchemaValidator');
const validatorHandler = require('./../middlewares/validators');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.get();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(orderCreate, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
