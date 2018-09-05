const mongoose = require('mongoose');

mongoose.Promise = global.Promise;// this line says that the promises that we want to use is the default one and not one from third part libraries
mongoose.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true});

module.exports = {mongoose};
