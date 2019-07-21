
const express = require('express');
const ToDo = require('./../models/todos');

const router = express.Router();
let response = {};
// get all tasks
router.get('/todos', (req, res, next) => {
  ToDo.find()
    .sort({ status: -1 })
    .select({ __v: 0 })
    .then((data) => {
      response = {
        statusCode: 200,
        status: true,
        message: 'Success',
        data,
      };
      res.status(response.statusCode).json(response);
    })
    .catch(next);
});

// create new task
router.post('/todos', (req, res, next) => {
  const todo = new ToDo(req.body);
  todo.save()
    .then((data) => {
      response = {
        statusCode: 200,
        status: true,
        message: 'Success',
        data,
      };
      res.status(response.statusCode).json(response);
    })
    .catch(next);
});

// update task status
router.put('/todos/:_id', (req, res, next) => {
  const { _id } = req.params;
  const todos = req.body;
  todos.updatedAt = Date.now();
  ToDo.findOneAndUpdate({ _id }, { $set: todos }, { new: true })
    .then((data) => {
      if (!data) {
        response = {
          statusCode: 404,
          status: false,
          message: 'Todo Not Found',
        };
      }
      response = {
        statusCode: 200,
        status: true,
        message: 'Success',
        data,
      };
      res.status(response.statusCode).json(response);
    })
    .catch(next);
});

router.delete('/todos/:_id', (req, res, next) => {
  const { _id } = req.params;
  ToDo.remove({ _id })
    .then((data) => {
      if (data.deletedCount === 0) {
        response = {
          statusCode: 404,
          status: true,
          message: 'Todo Not Found',
        };
        return res.status(response.statusCode).json(response);
      }
      response = {
        statusCode: 200,
        status: true,
        message: 'Success',
      };
      return res.status(response.statusCode).json(response);
    })
    .catch(next);
});


module.exports = router;
