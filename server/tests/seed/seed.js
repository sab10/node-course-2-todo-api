const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo.js');
const {User} = require('./../../models/user.js');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [{
  _id : userOneID,
  email : 'sabin@test.com',
  password : 'UserTestPass',
  tokens : [{
    access : 'auth',
    token : jwt.sign({_id: userOneID, access : 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id :userTwoID,
  email : 'mail@test.com',
  password : 'UserTestPass2',
  tokens : [{
    access : 'auth',
    token : jwt.sign({_id: userTwoID, access : 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const todos = [{
  _id : new ObjectID(),
  text : 'First test to do',
  _creator : userOneID
}, {
  _id : new ObjectID(),
  text : 'Second test to do',
  _creator : userTwoID,
  completed : true,
  completedAt : 33
}];

const populateTodos = (done) => {
  Todo.deleteMany().then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.deleteMany().then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};


module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};
