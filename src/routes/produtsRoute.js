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
    id ++;
  }
  res.status(201).send(`${limitOfProducts} created succesfully!`);
});

router.post('/', (req, res) => {
  const body = req.body;

  products.push({
    id: id,
    name: body.name,
    price: body.price
  });

  res.json({
    message: "Product created succesfully!",
    id: id,
    data: body
  });
  id++;
})


router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  const auxiliary = [];
  if(limit && offset) {
    if (offset < products.length - 1) {
      for(let i = offset; i < limit; i++) {
        auxiliary.push(products[i]);
      }
      res.json(auxiliary)
    }
  } else {
    res.json(products);
  }

});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(products[id]);
});

module.exports = router;
