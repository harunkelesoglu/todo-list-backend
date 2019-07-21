const mongoose = require('mongoose');
const config = require('../config/config.json');

const { Schema } = mongoose;
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line dot-notation
const mongoUrl = config.db[env];

mongoose.Promise = Promise;
mongoose.connect(mongoUrl)
  .catch(err => console.log(err.message))
  .then(() => console.log('Connected to mlab'));

const ToDoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['complete', 'incomplete'],
    default: 'incomplete',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const ToDo = mongoose.model('ToDo', ToDoSchema, 'todos');

// eslint-disable-next-line func-names
ToDoSchema.statics.getAllToDos = function () {
  return ToDo.find();
};

// eslint-disable-next-line func-names
ToDoSchema.statics.newToDo = function (todo) {
  return todo.save();
};

// eslint-disable-next-line eol-last
module.exports = ToDo;