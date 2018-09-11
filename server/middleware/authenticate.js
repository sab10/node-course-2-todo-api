var {User} = require('./../models/user.js');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if(!user) {
      //res.status(401).send(); // this is the code we will write usually but we will write in another way
      return Promise.reject(); // this will return a reject so the catch will be executed and wehave not written the same code two times
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
