var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

const port = process.env.PORT || 3000;

//var newTodo = new Todo({
//  text : 'Node project',
//});
//newTodo.save().then((doc) => {
//  console.log(doc);
//}, (e) => {
//  console.log('Error');
//});



//var user = new User({
//  email : 'sabin@esempio.com'
//});

//user.save().then((res) => {
//  console.log(res);
//}, (e) => {
//  console.log(e);
//});

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
//  console.log(req.body);// this stamps the post request that is coming from the browser
//  res.send('nothing special'); // this give the response to the server

  var todo = new Todo({
    text : req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log('Started to listen on port ',port);
});


module.exports = {app};
