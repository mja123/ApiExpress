const express = require('express');
require('dotenv').config();
const routerManager = require('./routes/indexRoutes');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("I'm a get method!");
});


routerManager(app);

app.listen(port, () => {
  console.log(`I'm listening in the port ${port}`);
});


