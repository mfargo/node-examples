WBRenderer = {
	ratio: 1/100, // Meters per Pixel. Box2d operates in meters, and physics breaks apart at long distances.

	init: function(w, h, world) {
		this.width = w;
		this.height = h;
		this.world = world;
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setSize( w, h );
		$('.main-wrapper')[0].appendChild( this.renderer.domElement );

		this.scene = new THREE.Scene();
		//this.camera = new THREE.PerspectiveCamera( 50, w / h, 1, 1000 );
		this.camera = new THREE.OrthographicCamera( w / - 2, w / 2, h / 2, h / - 2, - 500, 1000 );
		this.camera.position.set( 0, 0, 600 );
		this.camera.lookAt( new THREE.Vector3(0, 0, 0) );
		this.scene.add( this.camera );
		this.container = new THREE.Object3D();
		this.scene.add( this.container );
		this.projector = new THREE.Projector(); 

		this.renderModel = new THREE.RenderPass( this.scene, this.camera, undefined, 0x00FFFFFF, 0.0); // , 
		this.effectBloom = new THREE.BloomPass( 4.0 );
		this.effectCopy = new THREE.ShaderPass( THREE.CopyShader );

		/*
		this.effectEdge = new THREE.ShaderPass( THREE.EdgeShader );
		this.effectEdge.uniforms[ 'aspect' ].value.x = w/2;
		this.effectEdge.uniforms[ 'aspect' ].value.y = h/2;
*/

		//this.effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );
		//this.effectFXAA.uniforms[ 'resolution' ].value.set( 1 / w, 1 / h );
		this.effectCopy.renderToScreen = true;
		this.composer = new THREE.EffectComposer( this.renderer );
		this.composer.addPass( this.renderModel );
		//this.composer.addPass( this.effectFXAA );
		this.composer.addPass( this.effectBloom );
		this.composer.addPass( this.effectCopy );

		//this.composer.addPass( this.effectEdge );
		this.renderer.setClearColorHex ( 0x000000, 0.0 );
		this.startTime = new Date().getTime();
	},
	render: function() {
		//var t = new Date().getTime();
		//this.fps = 1000 / (t - this.startTime);
	  	this.world.Step(1/60, 3, 2);
		//this.startTime = t;
		this.renderer.clear();
		
		//var canvas = $('canvas')[0];
		//var context = canvas.getContext('2d');
		//var grd = context.createRadialGradient(238, 50, 10, 238, 50, 300);

		this.composer.render();
		//this.renderer.render(this.scene, this.camera);
	},
	getPoint: function(cursor) {
	    var vector = new THREE.Vector3( ( cursor.x / this.width ) * 2 - 1, -( cursor.y / this.height ) * 2 + 1, 0.5 );
	    this.projector.unprojectVector( vector, this.camera );
	    var dir = vector.subSelf( this.camera.position ).normalize();
	    var ray = new THREE.Ray( this.camera.position, dir );
	    var distance = -this.camera.position.z / dir.z;
	    return this.camera.position.clone().addSelf( dir.multiplyScalar( distance ) );
	}
}
