const express = require('express');
const logger = require('morgan');
const ToDo = require('./models/todos');

const app = express();
const PORT = process.env.PORT || 3000;
const response = {};

app.use(express.json());
app.use(logger('dev'));

// get all tasks
app.get('/todos', (req, res, next) => {
  ToDo.find()
    .select({ __v: 0 })
    .then((data) => {
      response.statusCode = 200;
      response.message = 'Success';
      response.data = data;
      res.status(response.statusCode).json(response);
    })
    .catch(next);
});

// create new task
app.post('/todos', (req, res, next) => {
  const todo = new ToDo(req.body);
  todo.save()
    .then((data) => {
      response.statusCode = 200;
      response.message = 'Success';
      response.data = data;
      res.status(response.statusCode).json(response);
    })
    .catch(next);
});

// update task status
app.put('/todos/:_id', (req, res, next) => {
  const { _id } = req.params;
  const todos = req.body;
  todos.updatedAt = Date.now();
  ToDo.findOneAndUpdate({ _id }, { todos }, { new: true })
    .then((data) => {
      if (!data) {
        response.statusCode = 404;
        response.message = 'ToDo Not Found';
      }
      response.statusCode = 200;
      response.message = 'Success';
      response.data = data;
      res.status(response.statusCode).json(response);
    })
    .catch(next);
});

app.delete('/todos/:_id', (req, res, next) => {
  const { _id } = req.params;
  ToDo.remove({ _id })
    .then((data) => {
      if (data.deletedCount === 0) {
        response.statusCode = 404;
        response.message = 'Todo not found';
        return res.status(response.statusCode).json(response);
      }
      response.statusCode = 200;
      response.message = 'Success';
      response.data = data;
      return res.status(response.statusCode).json(response);
    })
    .catch(next);
});

app.use((err, req, res, next) => {
  response.statusCode = 500;
  response.message = err.message;
  res.status(response.statusCode).json(response);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running PORT:', PORT);
});
