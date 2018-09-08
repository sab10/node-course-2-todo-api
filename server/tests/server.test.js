// watch again this file

const expect = require ('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

const todos = [{
  _id : new ObjectID(),
  text : 'First test to do'
}, {
  _id : new ObjectID(),
  text : 'Second test to do'
}];

beforeEach((done) => { // the beforeEach methos executes automatically before every test case, and the test case will not be executed if the before each not work properly
  Todo.deleteMany().then(() => { // this method cancel all the data in the collection before to add the new one, because in the next lines we check the first element of the collection and we want it to be the one we insert now and there is the check for todos.length to be 1 so only one alement can be in the table to pass the test
    //done(); // before, when we was testing only post in this method was only this command
    return Todo.insertMany(todos);
  }).then(() => {
    done();
  });
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });

  it('should create a todo with valid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err)
        return done(err);

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });
});

// ALL the test fails for a strange error that I have to find yet

// i solved the first one and was an error writing code
// the second is Uncaught Error: listen EADDRINUSE :::3000
// I SOLVED THE PROBLEM ABOVE, so the problem was that the port was already used because I was leaving the server opened, I needed to close it before to launche the test!!!!!!!!!!!!!!!!!!


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done());
  })
});

describe('GET /todos/:id', () => {
  it('should get todos doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done());
  });

  //it('should return 404 if todo not found', (done) => {
  //  var hexID = new ObjectID().toHexString();
  //  request(app)
  //  .get(`/todos/${hexID}`)
  //  .expect(404)
  //  .end(done());
  //});
});
