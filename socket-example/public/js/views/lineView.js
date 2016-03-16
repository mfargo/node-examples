var LineView = function(world, v, baseHue) {
	this.world = world;
	this.segments = new Array();
	this.edges = new Array();
	this.fixtures = new Array();
	this.lastPoint = v;
	this.lp1 = null;
	this.lp2 = null;
	this.hue = baseHue;
	//this.material = new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1, vertexColors: true  } );

	this.body = this.world.CreateBody( new Box2D.b2BodyDef() );
	this.length = 0;
	this.finishTime = 0;
}
LineView.prototype.addPoint = function(v) {
	//this.shape.SetNextVertex( new Box2D.b2Vec2(v.x - this.worldWidth/2, v.y - this.worldHeight/2) );

	var material = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 1, vertexColors: true, transparent:true } );
	var d = this.lastPoint.distanceTo(v);
	if (d < 2) return;
	this.length += d;
	this.addEdge(v);

		// angle of verts
	var a = Math.atan2(v.y - this.lastPoint.y, v.x - this.lastPoint.x);
	a += Math.PI/2;

	var thickness = 7;

	var geometry = new THREE.Geometry();
	var c1 = new THREE.Color( 0xFFFFFF );
	c1.setHSV( this.hue, 1.0, 1.0 );
	this.hue+=0.002;
	if (this.hue > 1) this.hue=0;
	var c2 = new THREE.Color( 0xFFFFFF );
	c2.setHSV( this.hue, 1.0, 1.0 );	

	var sx = Math.cos(a)*thickness;
	var sy = Math.sin(a)*thickness;
	if (this.lp1==null) this.lp1 = new THREE.Vector3(this.lastPoint.x + sx, this.lastPoint.y + sy);
	if (this.lp2==null) this.lp2 = new THREE.Vector3(this.lastPoint.x - sx, this.lastPoint.y - sy);
	var p1 = new THREE.Vector3(v.x + sx, v.y + sy);
	var p2 = new THREE.Vector3(v.x - sx, v.y - sy);

	geometry.colors.push( c1 );
	geometry.vertices.push( this.lp1 );
	geometry.colors.push( c1 );
	geometry.vertices.push( this.lp2 );
	geometry.colors.push( c2 );
	geometry.vertices.push( p1 );



	geometry.colors.push( c1 );
	geometry.vertices.push( this.lp2 );
	geometry.colors.push( c2 );
	geometry.vertices.push( p1 );
	geometry.colors.push( c2 );
	geometry.vertices.push( p2 );
	this.hue+=0.002;

	this.lastPoint = v;
	this.lp1 = p1;
	this.lp2 = p2;
	//var line = new THREE.Line( geometry, material );
	var line = new THREE.Ribbon( geometry, material );
	this.segments.push(line);
 	WBRenderer.scene.add(line);
}
LineView.prototype.addEdge = function(v) {
	
	var vec1 = new Box2D.b2Vec2(this.lastPoint.x * WBRenderer.ratio, this.lastPoint.y * WBRenderer.ratio);
	var vec2 = new Box2D.b2Vec2(v.x * WBRenderer.ratio, v.y * WBRenderer.ratio);
	
	var edge = new Box2D.b2EdgeShape();
	edge.Set( vec1, vec2 );
	var fixtureDef = new Box2D.b2FixtureDef();
	fixtureDef.set_shape( edge );
	var fixture = this.body.CreateFixture( fixtureDef );
	fixture.SetFriction(0);
	fixture.SetRestitution(1);
	fixture.SetDensity(1);
	this.fixtures.push(fixture);
}
LineView.prototype.destroy = function() {
	if (this.body==null) return;

	//while (this.segments.length > 0 ) WBRenderer.scene.remove(this.segments.pop());
	for (var i =0; i<this.segments.length; i++) WBRenderer.scene.remove(this.segments[i]);

	this.world.DestroyBody(this.body);
	this.body=null;
}
LineView.prototype.getTimeUp = function() {
	return new Date().getTime() - this.finishTime;
}

