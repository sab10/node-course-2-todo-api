
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true}, (err, client) => {
  if(err) {
     return console.log('Unable to connect to the mongodb server');
  }
  console.log('Connected to mongodb server');

  const db = client.db('TodoApp');

//    db.collection('Todos').find({completed: false}).toArray().then((docs) => {    // .find({completed: false}) is how to make a query that search for the fata that have completed value to false
//    console.log('Todos');
//    console.log(JSON.stringify(docs, undefined, 2));
//  }, (err) => {
//    console.log('Unable to fetch data',err);
//  });

//  db.collection('Todos').find().count().then((count) => { // the count method counts the number of records in the db called
//    console.log(`Todos count: ${count}`);
//  }, (err) => {
//    console.log('Unable to fetch data',err);
//  });

db.collection('Users').find({name:'Sabin'}).toArray().then((docs) => {
  console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
  console.log('Error');
});

  //client.close();
});
