const express = require('express');

const ProductService = require('./../services/productService');
const responses = require('../helpers/responses');
const validatorHandler = require('./../middlewares/validators');
const {
  createSchema,
  updateSchema,
  deleteSchema,
  findOneSchema,
} = require('./../validators/productsSchemaValidator');
const router = express.Router();
const service = new ProductService();

router.post('/', validatorHandler(createSchema, 'body'), async (req, res, next) => {
  const body = req.body;
  try {
    const newProduct = await service.post(body);
    responses(newProduct, 201, 'Product created succesfully!', res);
  } catch(error) {
    next(error);
  }

});

router.get('/', async (req, res, next) => {

  const getProducts = await service.get();

  try {
    responses(getProducts, 200, 'Product found succesfully!', res)
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
      responses(getProductById, 200, 'Product found!', res);
    } catch (error) {
      next(error);
    }
  }
);
/*
router.patch(
  '/:id',
  validatorHandler(updateSchema, ['params', 'body']),
  async (req, res, next) => {
    const { id } = req.params;
    let body = req.body;

    try {
      const patchProduct = await service.patch(id, body);
      responses(patchProduct, 200, 'Product pached correctly!', res);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(updateSchema, ['params', 'body']),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const putProduct = await service.put(id, body);
      responses(putProduct, 200, 'Product updated correctly!', res);
    } catch (error) {
      next(error);
    }
  }
);
*/
router.delete(
  '/:id',
  validatorHandler(deleteSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const deleteProduct = await service.delete(id);
      responses(
        deleteProduct,
        200,
        'Product deleted correctly!',
        res
      );
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
