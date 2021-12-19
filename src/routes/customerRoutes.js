const express = require('express');
const customerService = require('./../services/customerService');
const {
  customerCreate,
  customerFind,
  customerPatch,
  customerPut,
} = require('./../validators/customerSchemaValidator');
const validatorHandler = require('./../middlewares/validators');

const router = express.Router();
const service = new customerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.get();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(customerCreate, 'body'),
async (req, res, next) => {
    const body = req.body;
    try {
        const createCustomer = await service.create(body);
        res.status(201).json(createCustomer);
    } catch(error) {
        next(error);
    }
});

module.exports = router;