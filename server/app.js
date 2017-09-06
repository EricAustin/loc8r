var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static('server/public'));

app.use(express.static('public'));

app.listen(port, function() {
  console.log('localhost running on port', port);
});
