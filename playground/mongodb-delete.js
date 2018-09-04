
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true}, (err, client) => {
  if(err) {
     return console.log('Unable to connect to the mongodb server');
  }
  console.log('Connected to mongodb server');

  const db = client.db('TodoApp');

  //db.collection('Todos').deleteMany({text : 'Lunch'}).then((result) => {
  //  console.log(result);
  //}); // in the terminal when I launch this method at the begin of the response it will be "result: { n: 3, ok: 1}" where ok: 1 means that all gone well without error and n:3 means that was deleted 3 objects

  //db.collection('Todos').deleteOne({text: 'Lunch'}).then((result) => {
  //  console.log(result);
  //});

  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  }); // the difference between this method andh deleteOne is that this returns the object that was deleted 



  client.close();
});
