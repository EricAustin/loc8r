var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinSchema = new Schema({
  username: {type: String, required: true},
  location: {type: Array},
  group: {type: String}
  
});

module.exports = mongoose.model('Pin', pinSchema);
