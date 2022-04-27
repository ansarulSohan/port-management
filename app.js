require('express-async-errors');

const express = require('express');
const { connecDB } = require('./db/db');
const { errors } = require('./middlewares/errorHandler');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
connecDB();
app.use(express.json());
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] || :date'
  )
);
app.use(helmet());
// app.use(compression());

app.get('/', async (req, res) => {
  res.send('Hello World');
});
app.use('/api/users', require('./routes/users'));
app.use(errors);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('listening to port ' + port);
});
