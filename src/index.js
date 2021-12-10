const express = require('express');
require('dotenv').config();
const routerManager = require('./routes/indexRoutes');
const { consoleError, sendingError, sendingBoomError } = require('./middlewares/errors')

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("I'm a get method!");
});


routerManager(app);
app.use(consoleError);
app.use(sendingBoomError);
app.use(sendingError);

app.listen(port, () => {
  console.log(`I'm listening in the port ${port}`);
});

