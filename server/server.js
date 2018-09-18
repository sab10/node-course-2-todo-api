require('./config/config.js');


const _ = require('lodash');

var express = require('express'); // In this cases I can use const or var is the same
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate.js');

const {ObjectID} = require('mongodb');

const port = process.env.PORT;

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
  }).catch((e) => {
    res.status(400).send(e);
  }) ;
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }).catch((e) => {
    res.status(400).send(e);
  }) ;
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(todo){
      res.send({todo});
    }
    res.status(404).send();
  }).catch((e) => {
    res.status(400).send(e);
  }) ;
  //res.send(req.params);  // this command send back the id wrote in the link
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id))
    res.status(404).send('Id not valid');

  Todo.findByIdAndDelete(id).then((todo) => {
    if(!todo)
      res.status(400).send('This is not an error, there is not a doc with that ID');

    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  }) ;
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id))
    res.status(404).send('Id not valid');

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set : body}, {new : true}).then((todo) => {
    if(!todo)
      res.status(404).send('nessun riscontro');

    res.send({todo});
  }).catch((e) => {
    res.status(400).send('errore preso');
  });
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {

    //two typer of methods we will make in this course
    //MODEL methods // are called in the User
    //INSTANCE methods // are called in the user

    return user.generateAuthToken();

  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});



app.get('/users/me', authenticate, (req, res) => { // the name of the variable create the middleware so the method get will be exetucate only if the authenticare goes well
  res.send('You are logged in yet');
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send('tokens deleted, user logged out');
  }, () => {
    res.status(400).send();
  });
});


app.get('/file', (req, res) => {
  res.download(__dirname+'/cazzeggio.txt'); // the download doesn't work if 1. the file is without something in it 2. if the file is in the path before che one where I am executing server.js for security issues
})

app.listen(port, () => {
  console.log('Started to listen on port ',port);
});


module.exports = {app};
