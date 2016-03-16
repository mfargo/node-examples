
BoardController =  {
	world: new Box2D.b2World( new Box2D.b2Vec2(0.0, 0.0) ),
	alpha: 1,
	lines: new Array(),
	currentLine: null,

	init: function(w, h) {
		this.width = w;
		this.height = h;
		WBRenderer.init(w, h, this.world);
		this.view = new BoardView(this.world, WBRenderer);
		//this.view.ball.reset({x:-this.width/4, y:0});
	},

	update: function() {
		this.view.update();
    WBRenderer.render();
	},


	clearBoard: function() {
		for (var i=0; i<this.lines.length; i++)
			this.lines[i].destroy();
		this.lines = new Array();
		TouchController.reset();		
	},


	lineStarted: function(p) {
		if (this.line!=null) {
			if (this.line.getTimeUp() < WBSettings.touchThreshold) return; // continue old paddle (compensates for sketchy touch table)
		}
		this.line = new LineView( BoardController.world, p, 0.5 ); // last number is baseHue!
	},
	lineUpdated: function(p) {
		if (this.line != null) this.line.addPoint(p);
	},
	lineFinished: function() {
		//if (line != null) line.updateRestitutions(this.view.ball.getVelocity());
	}


}
