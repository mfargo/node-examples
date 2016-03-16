var BoardView = function(world) {
	this.world = world;
	//this.background = new BackgroundView();

	this.material = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 1, linewidth: 6, vertexColors: true } );
	this.ground = world.CreateBody( new Box2D.b2BodyDef() );
	this.wallBuffer = 80;
	this.worldWidth = WBRenderer.width*WBRenderer.ratio;
	this.worldHeight = (WBRenderer.height-this.wallBuffer)*WBRenderer.ratio;
	//this.addWall(-this.worldHeight/2);
	//this.addWall(this.worldHeight/2);

}
BoardView.prototype.update = function() {
}

BoardView.prototype.addWall = function(y) {
	var wall = new Box2D.b2EdgeShape();
	wall.Set( new Box2D.b2Vec2( -this.worldWidth/2 , y  ), new Box2D.b2Vec2( this.worldWidth/2, y  ) );
	var fixtureDef = new Box2D.b2FixtureDef();
	fixtureDef.set_density( 1 );
	fixtureDef.set_friction( 0 );
	fixtureDef.set_restitution(1.1);
	fixtureDef.set_shape( wall );
	this.ground.CreateFixture( fixtureDef );
	
	var geometry = new THREE.Geometry();

	var verts = 130;
	var seg = WBRenderer.width/verts;
	var hue = 0.2;
	for (var i=-1; i<verts; i++) {
		var c = new THREE.Color( 0xFFFFFF ) ;
		c.setHSV( hue, 1.0, 1.0 );
		geometry.colors.push( c );
		//hue += 0.002;
		var x = -WBRenderer.width/2 + i * seg;
		geometry.vertices.push( new THREE.Vector3( x, y/WBRenderer.ratio ) );
	}
	var line = new THREE.Line( geometry, this.material );
	WBRenderer.scene.add(line);
}
