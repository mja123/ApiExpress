const express = require('express');
const customerService = require('./../services/customerService');

const {
  customerCreate,
  customerFind,
  customerPut,
} = require('./../validators/customerSchemaValidator');
const validatorHandler = require('./../middlewares/validators');

const router = express.Router();
const service = new customerService();

router.get('/', async (req, res, next) => {
  try {
    const { user } = req.query;
    const customers = await service.get(user);
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(customerCreate, 'body'),
  async (req, res, next) => {
    const { user } = req.query;
    const body = req.body;
    try {
      const createCustomer = await service.create(body, user);
      res.status(201).json(createCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(customerFind, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const customer = await service.findOne(id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(customerFind, 'params'),
  validatorHandler(customerPut, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const putCustomer = await service.put(id, body);
      res.status(200).json(putCustomer);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(customerFind, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedCustomer = await service.delete(id);
      res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
