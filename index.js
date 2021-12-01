const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send("I'm a get method!");
});
app.listen(port, () => {
  console.log(`I'm listening in the port ${port}`);
});

