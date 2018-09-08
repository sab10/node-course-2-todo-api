//const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo.js');

var id = '5b9393d0dd99b23be9378bae';

//if(!ObjectID.isValid(id)){
//  console.log('ID not valid');
//}

Todo.deleteMany({}).then((result) => {
  console.log(result);
});

//Todo.deleteOne()


Todo.findByIdAndDelete(id).then((doc) => {
  console.log(doc);
});



// ALL of this querys does not work like in the course and I don't know exactly why
