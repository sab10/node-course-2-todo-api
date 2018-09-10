const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({ // we have restructured the file before adding the Schema type to introduce some methods that we will use for tokens
  email : {
    type : String,
    required : true,
    trim : true,
    minlength : 1,
    unique : true,
    validate : {
      validator : validator.isEmail,
      // validator.isEmail is a faster way to write (value) => { return validator.isEmail(value); }
      message : `{VALUE} is not a valid email`
      }
  },
  password : {
    type : String,
    required : true,
    minlength : 6
  },
  tokens : [{
    access : {
      type : String,
      required : true
    },
    token : {
      type : String,
      required : true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);

};

UserSchema.methods.generateAuthToken = function() {
  var user = this; // probably in the arrow method is not possible to use the comand this so this is why in this case we are using normal function call (I read this thing online so I am not sure)
  var access = 'auth';
  var token = jwt.sign({_id : user._id.toHexString(), access : access}, 'secret').toString();

  user.tokens = user.tokens.concat([{
    token : token,
    access : access
  }]);

  return user.save().then(() => {
    return token;
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};
