const express = require('express');
const faker = require('faker');

const router = express.Router();
let products = [];
let id = 0;

router.post('/aleatory', (req, res) => {
  const { productsCount } = req.query;
  const limitOfProducts = productsCount || 10;

  for (let i = 0; i < limitOfProducts; i++) {
    products.push({
      id: id,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
    });
    id++;
  }
  res.status(201).send(`${limitOfProducts} created succesfully!`);
});

router.post('/', (req, res) => {
  const body = req.body;

  products.push({
    id: id,
    name: body.name,
    price: body.price,
  });

  res.json({
    message: 'Product created succesfully!',
    id: id,
    data: body,
  });
  id++;
});

router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  const auxiliary = [];
  if (limit && offset) {
    if (offset < products.length - 1) {
      for (let i = offset; i < limit; i++) {
        auxiliary.push(products[i]);
      }
      res.json(auxiliary);
    }
  } else {
    res.json(products);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(products[id]);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  let body = req.body;

  if (body.name) {
    products[id] = {
      id: id,
      name: body.name,
      price: products[id].price,
    };
    res.json({
      message: 'Product pached correctly!',
      data: products[id]
    });
  } if (body.price) {
    products[id] = {
      id: id,
      name: products[id].name,
      price: body.price,
    };
    res.json({
      message: 'Product pached correctly!',
      data: products[id]
    });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  products[id] = {
    id: id,
    name: body.name,
    price: body.price,
  };

  res.json({
    message: 'Product updated succesfully!',
    id: id,
    data: body,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'Product deleted succesfully!',
    data: products[id],
  });
  products.splice(id, 1);
});

module.exports = router;
