require('express-async-errors');

const express = require('express');
const { connecDB } = require('./db/db');
const { errors } = require('./middlewares/errorHandler');

const app = express();

connecDB();

app.get('/', async (req, res) => {});
app.use(errors);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('listening to port ' + port);
});
