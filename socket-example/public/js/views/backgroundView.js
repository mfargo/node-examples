var BackgroundView = function() {

	this.material = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 1, vertexColors: true } );	
	this.geometry = new THREE.Geometry();

	var c1 = new THREE.Color(0xe5e5e5);
	var c2 = new THREE.Color(0xd4d4d4);

	var p0 = new THREE.Vector3(0, 0);
	var p1 = new THREE.Vector3( -WBRenderer.width/2, -WBRenderer.height/2);
	var p2 = new THREE.Vector3( WBRenderer.width/2, -WBRenderer.height/2);
	var p3 = new THREE.Vector3( WBRenderer.width/2, WBRenderer.height/2);
	var p4 = new THREE.Vector3( -WBRenderer.width/2, WBRenderer.height/2);

	var radius = Math.sqrt(WBRenderer.width * WBRenderer.width + WBRenderer.height * WBRenderer.height);
	for (var i=0; i<Math.PI*2; i+=0.1) {
		this.geometry.colors.push(c1);
		this.geometry.vertices.push(p0);
		this.geometry.colors.push(c2);
		this.geometry.vertices.push(new THREE.Vector3(Math.cos(i) * radius, Math.sin(i) * radius));
		this.geometry.colors.push(c2);
		this.geometry.vertices.push(new THREE.Vector3(Math.cos(i+0.1) * radius, Math.sin(i+0.1) * radius));
	}


	this.mesh = new THREE.Ribbon(this.geometry, this.material);
	WBRenderer.scene.add(this.mesh);
	this.mesh.position.set(0, 0, -300);

}