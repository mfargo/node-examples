
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

$(document).ready(function() {

  BoardController.init(window.innerWidth, window.innerHeight);

  var render = function() {
    TWEEN.update();
    BoardController.update();
  }
  var animate = function() {
    requestAnimationFrame( animate );
    render();
  }
  animate();

  var socket = new WebSocket('ws://localhost:2929');
  socket.onmessage = function(e) {
    var a = e.data.split(',');
    if (a.length<3) return;
    var p = {x:a[1], y:a[2]};
    if (a[0]=="a") TouchController.startLine(p);
    else if (a[0]=="u") TouchController.updateLine(p);
    else if (a[0]=="e") TouchController.endLine(p);
  }

  TuioManager.addListener('cursorAdded', function(cursor) {
    socket.send('a,'+cursor.x+","+cursor.y);
    TouchController.startLine(cursor);
  });
  TuioManager.addListener('cursorUpdated', function(cursor) {
    socket.send('u,'+cursor.x+","+cursor.y);
    TouchController.updateLine(cursor);
  });
  TuioManager.addListener('cursorRemoved', function(cursor) {
    socket.send('e,'+cursor.x+","+cursor.y);
    TouchController.endLine(cursor);
  });

  /*
  TuioManager.addListener('fiducialAdded', function(fiducial) {
    fiducial.view = new FiducialView(fiducial);
  });
  TuioManager.addListener('fiducialUpdated', function(fiducial) {
    fiducial.view.update(fiducial);
  });
  TuioManager.addListener('fiducialRemoved', function(fiducial) {
    fiducial.view.destroy(fiducial);
  });

  TuioManager.addListener('handAdded', function(hand) {
    hand.view = new HandView(hand);
  });
  TuioManager.addListener('handUpdated', function(hand) {
    hand.view.update(hand);
  });
  TuioManager.addListener('handRemoved', function(hand) {
    hand.view.destroy(hand);
  });
  */



  TuioManager.addDebugListeners();

});

