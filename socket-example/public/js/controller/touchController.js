TouchController = {

	touches:new Array(),

	reset: function() {
		this.touches = new Array();
		this.socket.onmessage = this.onMessage;
	},

	startLine: function(cursor) {
		var p = WBRenderer.getPoint(cursor);
		if (this.touches.length==0) BoardController.lineStarted(p);
		this.touches.push(cursor.id);
	},

	updateLine: function(cursor) {
		var p = WBRenderer.getPoint(cursor);
		if (this.touches[0]==cursor.id) BoardController.lineUpdated(p);
	},
	endLine: function(cursor) {
			this.removeTouch(this.touches, cursor.id);
			if (this.touches.length==0) BoardController.lineFinished();
	},

	removeTouch: function(arr, id) {		
		for (var i=0; i<arr.length; i++)
			if (arr[i]==id) {
				arr.splice(i, 1);
				break;
			}
	}



}


