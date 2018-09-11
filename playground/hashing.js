const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
  id : 10
};

var token = jwt.sign(data, 'secret');
console.log(token);

var decoded = jwt.verify(token, 'secret'); // this method should return the data and a variable in plus in a JSON
console.log(decoded);

//var message = 'I am user number 3';
//var hash = SHA256(message).toString();

//console.log(message, hash);

//var data = {
//  id: 4
//};

//var token = {
//  data : data,
//  hash : SHA256(JSON.stringify(data) + 'somesecret').toString()
//};

//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(token.data)).toString();

//var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
//if(resultHash === token.hash) {
//  console.log('data was not changed');
//} else {
//  console.log('data was changed');
//}
//console.log(resultHash);
