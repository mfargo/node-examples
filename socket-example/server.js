var express = require('express');
var app = express();

// express beez
app.set('port', (process.env.PORT || 80));
app.use('/', express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.render('index.html');
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




// sockit

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 2929 });

wss.on('connection', function connection(ws) {
	console.log("got new connection.");
  ws.on('message', function incoming(message) {

    if (message!=undefined && message!= null) {

      // simply parroting !
	    wss.broadcast(message);

    }

  });
	ws.on('error', function (err) {
	  console.log("  error.. but handling it?");
	});
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};