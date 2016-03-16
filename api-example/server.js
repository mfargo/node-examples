var express = require('express');
var bodyParser = require('body-parser');

var apiController = require('./controllers/api');
var hogeController = require('./controllers/hoge');
var router = express.Router();


var app = express();
app.set('port', (process.env.PORT || 80));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.get('/api/', apiController.getRoot);
app.get('/api/hoge', hogeController.getHoges);
app.get('/api/hoge/:hoge_id', hogeController.getHoge);
app.post('/api/hoge', hogeController.postHoge);
app.put('/api/hoge/:hoge_id', hogeController.updateHoge);
app.delete('/api/hoge/:hoge_id', hogeController.deleteHoge);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


