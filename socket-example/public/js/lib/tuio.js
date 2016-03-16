
var TuioCursor = function(id, x, y) {
  this.id = id;
  this.update(x, y);
}
TuioCursor.prototype.update = function(x, y) {
  this.x = x;
  this.y = y;
}

var TuioHand = function(id, x, y, vx, vy, fid1, fid2, fid3, fid4, fid5, a1, a2, a3, a4, a5) {
  this.id = id;
  this.fingers = new Array();
  this.angles = new Array();
  this.update(x, y, vx, vy, fid1, fid2, fid3, fid4, fid5, a1, a2, a3, a4, a5);
}
TuioHand.prototype.update = function(x, y, vx, vy, fid1, fid2, fid3, fid4, fid5, a1, a2, a3, a4, a5) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.fingers[0] = TuioManager.cursors[fid1];
  this.fingers[1] = TuioManager.cursors[fid2];
  this.fingers[2] = TuioManager.cursors[fid3];
  this.fingers[3] = TuioManager.cursors[fid4];
  this.fingers[4] = TuioManager.cursors[fid5];
  this.angles[0] = a1;
  this.angles[1] = a2;
  this.angles[2] = a3;
  this.angles[3] = a4;
  this.angles[4] = a5;
}

var TuioFiducial = function(id, x, y, angle) {
  this.id = id;
  this.update(x, y, angle);
}
TuioFiducial.prototype.update = function(x, y, angle) {
  this.x = x;
  this.y = y;
  this.angle = angle;  
}


TuioManager = {

  fiducials: new Object(),
  cursors: new Object(),
  hands: new Object(),

  addListener: function(event, callback) {
    if (TuioManager.listeners[event]!=undefined) TuioManager.listeners[event] = callback;
  },

  listeners: {
    fiducialAdded: function(fiducial) {},
    fiducialUpdated: function(fiducial) {},
    fiducialRemoved: function(fiducial) {},
    cursorAdded: function(cursor) {},
    cursorUpdated: function(cursor) {},
    cursorRemoved: function(cursor) {},
    handAdded: function(hand) {},
    handUpdated: function(hand) {},
    handRemoved: function(hand) {}
  },

      // cursors
  _addCursor: function(id, x, y) {
    TuioManager.cursors[id] = new TuioCursor(id, x, y);
    TuioManager.listeners.cursorAdded(TuioManager.cursors[id]);
  },
  _updateCursor: function(id, x, y) {
    if (TuioManager.cursors[id]==undefined) return;
    TuioManager.cursors[id].update(x, y);
    TuioManager.listeners.cursorUpdated(TuioManager.cursors[id]);
  },
  _removeCursor: function(id, x, y) {
    if (TuioManager.cursors[id]==undefined) return;
    TuioManager.listeners.cursorRemoved(TuioManager.cursors[id]);
    delete TuioManager.cursors[id];
  },

      // fiducials
  _addFiducial: function(id, x, y, angle) {
    TuioManager.fiducials[id] = new TuioFiducial(id, x, y, angle);
    TuioManager.listeners.fiducialAdded(TuioManager.fiducials[id]);
  },
  _updateFiducial: function(id, x, y, angle) {
    if (TuioManager.fiducials[id]==undefined) return;
    TuioManager.fiducials[id].update(x, y, angle);
    TuioManager.listeners.fiducialUpdated(TuioManager.fiducials[id]);
  },
  _removeFiducial: function(id, x, y, angle) {
    if (TuioManager.fiducials[id]==undefined) return;
    TuioManager.listeners.fiducialRemoved(TuioManager.fiducials[id]);
    delete fiducials[id];
  },

      // hands
  _addHand: function(id, x, y, vx, vy, fid1, fid2, fid3, fid4, fid5, a1, a2, a3, a4, a5) {
    TuioManager.hands[id] = new TuioHand(id, x, y, vx, vy, fid1, fid2, fid3, fid4, fid5, a1, a2, a3, a4, a5);
    TuioManager.listeners.handAdded(TuioManager.hands[id]);
  },
  _updateHand: function(id, x, y, vx, vy, fid1, fid2, fid3, fid4, fid5, a1, a2, a3, a4, a5) {
    if (TuioManager.hands[id]==undefined) return;
    TuioManager.hands[id].update(x, y, vx, vy, fid1, fid2, fid3, fid4, fid5, a1, a2, a3, a4, a5);
    TuioManager.listeners.handUpdated(TuioManager.hands[id]);
  },
  _removeHand: function(id, x, y, vx, vy) {
    if (TuioManager.hands[id]==undefined) return;
    TuioManager.listeners.handRemoved(TuioManager.hands[id]);
    delete TuioManager.hands[id];
  },

  addDebugListeners: function() {
    document.onmousedown = function(e) { TuioManager._addCursor('m', e.x, e.y, 0, 0); }
    document.onmousemove = function(e) { TuioManager._updateCursor('m', e.x, e.y, 0, 0); }
    document.onmouseup = function(e) { TuioManager._removeCursor('m', e.x, e.y); }
  }

}

/** new implementation for npTuioClient browser plugin **/

function tuio_object_add(sid, fid, x, y, a) {
    TuioManager.fiducials[id] = new TuioFiducial(id, x, y, angle);
    TuioManager.listeners.fiducialAdded(TuioManager.fiducials[id]);
}

function tuio_object_update(sid, fid, x, y, a) {
    if (TuioManager.fiducials[id]==undefined) return;
    TuioManager.fiducials[id].update(x, y, angle);
    TuioManager.listeners.fiducialUpdated(TuioManager.fiducials[id]);
}

function tuio_object_remove(sid, fid, x, y, a) {
    if (TuioManager.fiducials[id]==undefined) return;
    TuioManager.listeners.fiducialRemoved(TuioManager.fiducials[id]);
    delete fiducials[id];
}

function tuio_cursor_add(id, fid, x, y) {
  TuioManager.cursors[id] = new TuioCursor(id, x, y);
  TuioManager.listeners.cursorAdded(TuioManager.cursors[id]);
}

function tuio_cursor_update(id, fid, x, y) {
  if (TuioManager.cursors[id]==undefined) return;
  TuioManager.cursors[id].update(x, y);
  TuioManager.listeners.cursorUpdated(TuioManager.cursors[id]);
}

function tuio_cursor_remove(id, fid, x, y) {
  console.log(id + ": " + x + ", " + y);
  if (TuioManager.cursors[id]==undefined) return;
  console.log(TuioManager.cursors[id]);
  TuioManager.listeners.cursorRemoved(TuioManager.cursors[id]);
  delete TuioManager.cursors[id];
}

function tuio_callback(type, sid, fid, x, y, a) {
  x *= $(document).width();
  y *= $(document).height();
  if (type == 0) {
    tuio_object_add(sid, fid, x, y, a);
  }
  else if (type == 1) {
    tuio_object_update(sid, fid, x, y, a);
  }
  else if (type == 2) {
    tuio_object_remove(sid, fid, x, y, a);
  }
  else if (type == 3) {
    tuio_cursor_add(sid, fid, x, y);
  }
  else if (type == 4) {
    tuio_cursor_update(sid, fid, x, y);
  }
  else if (type == 5) {
    tuio_cursor_remove(sid, fid, x, y);
  }
}


