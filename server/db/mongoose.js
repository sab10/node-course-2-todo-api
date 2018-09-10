const mongoose = require('mongoose');

mongoose.Promise = global.Promise;// this line says that the promises that we want to use is the default one and not one from third part libraries
mongoose.set('useCreateIndex',true); // I added this line because in the console as a deprecation warning made probably from the command 'unique' in the models 
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true});

module.exports = {mongoose};
