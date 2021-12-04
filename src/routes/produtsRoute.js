const express = require('express');
const faker = require('faker');
const responses = require('../helpers/responses')

const router = express.Router();
let products = [];
let idElement = 0;

router.post('/aleatory', (req, res) => {
  const { productsCount } = req.query;
  const limitOfProducts = productsCount || 10;

  for (let i = 0; i < limitOfProducts; i++) {
    products.push({
      id: idElement,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
    });
    idElement++;
  }
  res.status(201).send(`${limitOfProducts} created succesfully!`);
});

router.post('/', (req, res) => {
  const body = req.body;

  products.push({
    id: idElement,
    name: body.name,
    price: body.price,
  });
  responses.succesful(products, idElement, 201, 'Product created succesfully!', res);
  idElement++;
});

router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  const auxiliary = [];
  if (limit && offset) {
    if (offset < products.length - 1) {
      for (let i = offset; i < limit; i++) {
        auxiliary.push(products[i]);
      }
      responses.succesful(products, idElement, 200, 'Product found succesfully!', res);
      res.json(auxiliary);
    }
  } else {
    res.json(products);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if(responses.findId(products, id, idElement)) {
    responses.succesful(products, id, 200, 'Product found!', res);
  } else {
    responses.error(404, 'Product not found', res);
  }
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  let body = req.body;

  if(responses.findId(products, id, idElement)) {
    if (body.name) {
      products[id] = {
        id: id,
        name: body.name,
        price: products[id].price,
      };
    } if (body.price) {
      products[id] = {
        id: id,
        name: products[id].name,
        price: body.price,
      };
    }
    responses.succesful(products, id, 200, 'Product pached correctly!', res)
  } else {
    responses.error(404, 'Product not found', res);
  }

});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if(responses.findId(products, id, idElement)) {
    products[id] = {
      id: id,
      name: body.name,
      price: body.price,
    };
    responses.succesful(products, id, 200, 'Product updated succesfully!', res)
  } else {
    responses.error(404, 'Product not found', res);
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if(responses.findId(products, id, idElement)) {
    responses.succesful(products, id, 200, 'Product deleted succesfully!', res)
  } else {
    responses.error(404, 'Product not found', res);
  }
  products.splice(id, 1);
});

module.exports = router;
