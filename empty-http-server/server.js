var http = require('http');
var express = require('express');

var app = express();

app.get('/hoge/', function(req, res) {
  res.send("piyo");
});

http.createServer(app).listen(80);
