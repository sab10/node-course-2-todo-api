// watch again this file

const expect = require ('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

beforeEach((done) => { // the beforeEach methos executes automatically before every test case, and the test case will not be executed if the before each not work properly
  Todo.deleteMany().then(() => { // this method cancel all the data in the collection before to add the new one, because in the next lines we check the first element of the collection and we want it to be the one we insert now and there is the check for todos.length to be 1 so only one alement can be in the table to pass the test
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
      Todo.find().then((todos) => {
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
        expect(todos.length).toBe(0);
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
