const express = require('express');
const ProductService = require('./../services/productService');
const responses = require('../helpers/responses');

const router = express.Router();
const service = new ProductService();

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.post(body);
  responses.succesful(newProduct, 201, 'Product created succesfully!', res);
});

router.get('/', (req, res, next) => {
  const { limit, offset } = req.query;

  const getProducts = service.get(limit, offset);

  try {
    if (getProducts.length != 0) {
      res.json(getProducts);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const getProductById = service.findOne(id);

  try {
    getProductById;
    responses.succesful(getProductById, 200, 'Product found!', res);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  let body = req.body;

  const patchProduct = service.patch(id, body);

  try {
    patchProduct;
    responses.succesful(patchProduct, 200, 'Product pached correctly!', res);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  const putProduct = service.put(id, body);

  try {
    putProduct;
    responses.succesful(putProduct, 200, 'Product updated correctly!', res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  const deleteProduct = service.delete(id);

  try {
    deleteProduct;
    responses.succesful(deleteProduct, 200, 'Product deleted correctly!', res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
