const express = require('express');
const faker = require('faker');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
let products = [];

app.get('/', (req, res) => {
  res.send("I'm a get method!");
});

app.post('/product', (req, res) => {
  for (let i = 0; i < 10; i++) {
    products.push({
      id: i,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
    });
  }
  res.status(201).send(`${products.length} created succesfully!`);
});

app.get('/products', (req, res) => {
  const { limit, offset } = req.query;

  const auxiliary = [];
  if(limit && offset) {
    if (offset < products.length - 1) {
      for(let i = offset; i < limit; i++) {
        auxiliary.push(products[i]);
      }
      res.send(auxiliary)
    }
  } else {
    res.send(products);
  }

});

app.get('/product/:id', (req, res) => {
  const { id } = req.params;
  res.send(products[id]);
});



app.listen(port, () => {
  console.log(`I'm listening in the port ${port}`);
});

/*res.json([
    {
      id: 1,
      name: "computer",
      price: 100
    },
    {
      id: 2,
      name: "TV",
      price: 50
    }
  ])*/

/*
const express = require("express");
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello crayola');
});

app.get('/route-new', (req, res) => {
    res.send('Hola soy una nueva ruta o endpoint');
});

app.get('/products', (req, res) => {
    res.json([{
            name: 'Laptop Gamer',
            price: 23000,
        },
        {
            name: 'iPhone X3',
            price: 32000,
        }
    ]);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        name: 'iPhone X3',
        price: 32000,
    });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
        categoryId,
        productId
    });
});

app.get('/categories/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    res.json({
        categoryId,
        category: 'Computers & Accesories'
    });
});

app.get('/people', (req, res) => {
    res.json([{
        name: 'Arturo',
        type: 'employee'
    }, {
        name: 'Jimena',
        type: 'customer'
    }]);
});

app.get('/people/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        name: 'Arturo',
        type: 'employee'
    });
});

*/
