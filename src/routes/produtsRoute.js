const express = require('express');
const ProductService = require('./../services/productService')
const responses = require('../helpers/responses')

const router = express.Router();
const service = new ProductService();


router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.post(body);
  responses.succesful(newProduct, 201, 'Product created succesfully!', res);

});

router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  const getProducts = service.get(limit, offset)

  if(getProducts.length != 0) {
    res.json(getProducts);
  } else {
    responses.error(404, 'Products not found', res);
  }

});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const getById = service.findOne(id);

  if(getById != undefined) {
     responses.succesful(getById, 200, 'Product found!', res);
  } else {
    responses.error(404, 'Product not found', res);
  }
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  let body = req.body;

  const patchProduct = service.patch(id, body);

  if(patchProduct != -1) {
    responses.succesful(patchProduct, 200, 'Product pached correctly!', res)
  } else {
    responses.error(404, 'Product not found', res);
  }

});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const putProduct = service.put(id, body);

  if(putProduct != -1) {
    responses.succesful(putProduct, 200, 'Product updated correctly!', res)
  } else {
    responses.error(404, 'Product not found', res);
  }

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const delteProduct = service.delete(id);

  if(delteProduct != -1) {
    responses.succesful(delteProduct, 200, 'Product deleted correctly!', res)
  } else {
    responses.error(404, 'Product not found', res);
  }

});


module.exports = router;
