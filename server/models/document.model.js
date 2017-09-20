var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinSchema = new Schema({
  username: {type: String},
  location: {type: Array},
  speed: {type: Number},
  group: {type: String},
  timestamp: {}  
});

module.exports = mongoose.model('Pin', pinSchema);
