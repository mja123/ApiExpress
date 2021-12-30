const express = require('express');
const customerService = require('./../services/customerService');

const {
  customerCreate,
  customerFind,
  customerPut,
  customerPatch,
} = require('./../validators/customerSchemaValidator');
const validatorHandler = require('./../middlewares/validators');
const queryValidator = require('./../middlewares/queryParams');

const router = express.Router();
const service = new customerService();

router.get('/', queryValidator('users'),
 async (req, res, next) => {
  try {
    const { users } = req.query;
    const customers = await service.get(users);
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(customerCreate, 'body'),
  queryValidator('users'),
  async (req, res, next) => {
    const { users } = req.query;
    const body = req.body;
    try {
      const createCustomer = await service.create(body, users);
      res.status(201).json(createCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(customerFind, 'params'),
  queryValidator('users'),
  async (req, res, next) => {
    const { id } = req.params;
    const { users } = req.query;
    try {
      const customer = await service.findOne(id, users);
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

router.patch(
  '/:id',
  validatorHandler(customerFind, 'params'),
  validatorHandler(customerPatch, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.params;

      const patchedCustomer = await service.patch(id, body);
      res.status(200).json(patchedCustomer);
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
