const express = require('express');
require('dotenv').config();
const routerManager = require('./routes/indexRoutes');
const { consoleError, sendingError, sendingBoomError } = require('./middlewares/errors')
const queryValidator = require('./middlewares/queryParams');

const app = express();
const port = process.env.PORT;

app.use(express.json());
routerManager(app);

app.use(queryValidator);
app.use(consoleError);
app.use(sendingBoomError);
app.use(sendingError);

app.listen(port, () => {
  console.log(`I'm listening in the port ${port}`);
});

