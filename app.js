const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const ToDoController = require('./controllers/todos');

const app = express();
const PORT = process.env.PORT || 3000;
const response = {};

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.get('/', (req, res) => {
  response.statusCode = 200;
  response.status = true;
  response.message = 'Welcome to app';
  res.status(response.statusCode).json(response);
});
app.use('/api/v1', ToDoController);
app.use((err, req, res) => {
  response.statusCode = 500;
  response.status = false;
  response.message = err.message;
  res.status(response.statusCode).json(response);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running PORT:', PORT);
});
