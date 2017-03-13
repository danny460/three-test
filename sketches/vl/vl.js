(function(){
	var renderer, scene, camera, control;
	var stats = new Stats(1);
	document.body.appendChild( stats.dom );
	init();
	animate();

	function init(){
		renderer = new three.WebGLRenderer();
		renderer.setClearColor(0xEEEEEE, 1);
		renderer.setSize(innerWidth, innerHeight);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = three.PCFSoftShadowMap;
		scene = new three.Scene();
		scene.showAxis(5000);
		camera = new three.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
		camera.position.set(50, 50, 50);
		camera.lookAt(scene.position);
		control = new three.orbitControl(renderer, camera);
		control.enable();
		document.body.appendChild(renderer.domElement);
		initScene();
	}

	function initScene(){
		var boxGeo = new three.BoxGeometry(10,10,10);
		var boxMat = new three.MeshLambertMaterial();
		var box = new three.Mesh(boxGeo, boxMat);
		scene.add(box);
	}

	function render(){
		renderer.render(scene, camera);
	}

	function animate(){
		stats.begin();
		render();
		stats.end();
		requestAnimationFrame(animate);
	}
})();