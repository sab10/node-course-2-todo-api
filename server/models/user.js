const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

// use statics instead of methods is pretty much the same thing but everything that is statics turns into model methods , not instance
// To understand this things better watch where I call these two methods in the server.js, .methods is called with user when .statics by User
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'secret');
  } catch(e) {
    //return new Promise ((resolve, reject) => {
    //  reject();
    //});
    // there is a faster way to write the reject
    return Promise.reject();
  }

  return User.findOne({
    _id : decoded._id,
    'tokens.token' : token,
    'tokens.access' : 'auth'
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};
