
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true}, (err, client) => {
  if(err) {
     return console.log('Unable to connect to the mongodb server');
  }
  console.log('Connected to mongodb server');

  const db = client.db('TodoApp');

  //db.collection('Todos').findOneAndUpdate({_id : new ObjectID('5b8e57929bdaa2e6fb340c00')},{$set : {completed : true}}, {returnOriginal : false}).then((result) => {
  //  console.log(result);
  //});
  // I made an error alone and that was that I can't write the _id like a string, I have to make a new ObjectID


  // I will try to make alone a method that increment in the users table the age of 1 of the records that have name equal to Sabin
  db.collection('Users').findOneAndUpdate({name : 'Sabin'},{$inc : {age : 2}}, {returnOriginal : false}).then((result) => {
    console.log(result);
  })
  client.close();
});
