three.orbitControls = function(){
	function attachEventListner(){
		window.addEventListener("resize", onWindowResize);
		renderer.domElement.addEventListener("mousedown", onMouseDown);
		renderer.domElement.addEventListener("mouseup", onMouseUp);
		renderer.domElement.addEventListener("mousewheel", onScroll);
	}
	function onWindowResize() {
		sceneCamera.aspect = innerWidth / innerHeight;
		sceneCamera.updateProjectionMatrix();
		renderer.setSize( innerWidth, innerHeight );
		console.log("resized");
	}
	function onMouseDown(e){
		e.preventDefault();
		renderer.domElement.addEventListener("mousemove", onMouseMove);
		lastX = e.clientX;
		lastY = e.clientY;
	}
	function onMouseMove(e){
		e.preventDefault();
		var dx = e.clientX - lastX;
		var dy = e.clientY - lastY;
		lastX = e.clientX;
		lastY = e.clientY;
		rotateAboutY(dx, scene.position);
		sceneCamera.position.y += dy;
		sceneCamera.lookAt(scene.position);

		function rotateAboutY(dx, target){
			target || (target = scene.position);
			var px = sceneCamera.position.x;
			var pz = sceneCamera.position.z;
			var magnitude = Math.sqrt(px * px + pz * pz);
			var angle = Math.atan2(pz, px) + dx * 2 * Math.PI / 360;
			sceneCamera.position.z = magnitude * Math.sin(angle);
			sceneCamera.position.x = magnitude * Math.cos(angle);
			sceneCamera.lookAt(target);
		}
	}
	function onMouseUp(e){
		e.preventDefault();
		renderer.domElement.removeEventListener("mousemove", onMouseMove);
	}
	function onScroll(e){
		e.preventDefault();
		var factor = 0.05;
		factor = 1 + (e.wheelDelta > 0 ? -factor : factor);
		sceneCamera.position.x *= factor;
		sceneCamera.position.y *= factor;
		sceneCamera.position.z *= factor;
		sceneCamera.lookAt(scene.position);
	}

	scope.domElement.addEventListener("")


};