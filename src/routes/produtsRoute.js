const express = require('express');

const ProductService = require('./../services/productService');
const validatorHandler = require('./../middlewares/validators');
const {
  createSchema, patchSchema, findOneSchema, putSchema
} = require('./../validators/productsSchemaValidator');
const router = express.Router();
const service = new ProductService();

router.post('/', validatorHandler(createSchema, 'body'), async (req, res, next) => {
  const body = req.body;
  try {
    const newProduct = await service.post(body);
    res.status(201).json(newProduct);
  } catch(error) {
    next(error);
  }

});

router.get('/', async (req, res, next) => {

  const getProducts = await service.get();

  try {
    res.status(200).json(getProducts);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(findOneSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const getProductById = await service.findOne(id);
      res.status(200).json(getProductById);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(findOneSchema, 'params'),
  validatorHandler(patchSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    let body = req.body;

    try {
      const patchProduct = await service.patch(id, body);
      res.status(200).json(patchProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(findOneSchema, 'params'),
  validatorHandler(putSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const putProduct = await service.put(id, body);
      res.status(200).json(putProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(findOneSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const deleteProduct = await service.delete(id);
      res.status(200).json(deleteProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
