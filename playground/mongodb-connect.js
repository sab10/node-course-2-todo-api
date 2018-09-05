//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

//var obj = new ObjectID(); 
//console.log(obj);

//const user = {name: 'Sabin', age : 20};
//var {name} = user;
//console.log(name); // this is another example of destructuring more easy to understand

MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true}, (err, client) => {
  if(err) {
     return console.log('Unable to connect to the mongodb server');
  }
  console.log('Connected to mongodb server');

  const db = client.db('TodoApp');

//  db.collection('Todos').insertOne({
//    text: 'something to do',
//    completed : false
//  }, (err, result) => {
//    if(err) {
//       return console.log('Unable to insert to the mongodb server');
//    }
//    console.log(JSON.stringify(result.ops, undefined, 2));
//  });
//db.collection('Users').insertOne({
//  name : 'Sabin',
//  age : 20,
//  location : 'Turin'
//}, (err, result) => {
//  if(err) {
//         return console.log('Unable to insert to the mongodb server');
//      }
//    console.log(result.ops[0]._id.getTimestamp());
//});


  client.close();
});
