var express = require("express");
var app = express();












app.listen(3001, 'localhost', function() {
  console.log("... port %d in %s mode", app.address().port, app.settings.env);
});