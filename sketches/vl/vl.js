(function(){
	var scene, camera, control, stats;
	var renderer, composer, renderPass;
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
		stats = new Stats(1);
		document.body.appendChild(stats.dom);
		document.body.appendChild(renderer.domElement);
		initScene();
		initPostProcessing();
	}

	function initScene(){
		var boxGeo = new three.BoxGeometry(10,10,10);
		var boxMat = new three.MeshLambertMaterial();
		var box = new three.Mesh(boxGeo, boxMat);
		scene.add(box);
	}

	function initPostProcessing(){
		//postProcessing
		renderPass = new three.RenderPass(scene, camera);
		composer = new three.EffectComposer(renderer);
		composer.add(renderPass);
		
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