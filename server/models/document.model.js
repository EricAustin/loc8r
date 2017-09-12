var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  location: {type: Object}
  
});

module.exports = mongoose.model('User', UserSchema);
