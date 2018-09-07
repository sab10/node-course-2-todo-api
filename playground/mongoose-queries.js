const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo.js');

var id = '5b915c0138857312d54b656c';

if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}

Todo.find({
  _id : id // here I don't have to make new ObjectID because we are in mongoose and not in mongodb native library
}).then((todos) => {
  console.log(todos);
},  (e) => {
  console.log(e);
});

Todo.findOne({
  _id : id
}).then((todo) => {
  console.log(todo);
}, (e) => {
  console.log(e);
});

Todo.findById(id).then((todo) => {
  if(!todo)
    return console.log('Id not found');
  console.log(todo);
}).catch((e) => { // in this case I need to make the catch because if the if statement return an error I have to handle it
  console.log(e);
})
