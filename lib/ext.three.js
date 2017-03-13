var three = THREE;
//show ref axis
three.Scene.prototype.showAxis = function(length){
	var colors = [0xff0000, 0x00ff00, 0x0000ff];
	for(var i = 0 ; i < 3; i++){
		var from = [0,0,0];
		var to = [0,0,0];
		from[i] = length;
		to[i] = -length;
		var lineGeo = new three.Geometry();
		var lineMat = new THREE.LineBasicMaterial({ color: colors[i]});
		lineGeo.vertices.push(v3.apply(null, from), v3.apply(null, to));
		this.add(new three.Line(lineGeo, lineMat));
		//this.defineProperty();
	}
	
	function v3(x,y,z){
		return new three.Vector3(x, y, z);
	}
};
//hide ref axis
three.Scene.prototype.hideAxis = function(){
	//this.remve();	
};
//camera control
three.orbitControl = function(renderer, camera){
	var self = this;
	this.renderer = renderer;
	this.camera = camera;
	this.target = new three.Vector3(0,0,0);

	this.enable = function(){
		window.addEventListener("resize", onWindowResize);
		renderer.domElement.addEventListener("mousedown", onMouseDown);
		renderer.domElement.addEventListener("mouseup", onMouseUp);
		renderer.domElement.addEventListener("mousewheel", onScroll);
	}

	this.dispose = function(){
		window.removeEventListener("resize", onWindowResize);
		renderer.domElement.removeEventListener("mousedown", onMouseDown);
		renderer.domElement.removeEventListener("mouseup", onMouseUp);
		renderer.domElement.removeEventListener("mousewheel", onScroll);
	}

	function onWindowResize() {
		camera.aspect = innerWidth / innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( innerWidth, innerHeight );
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
		rotateAboutY(dx, self.target);
		camera.position.y += dy;
		camera.lookAt(self.target);

		function rotateAboutY(dx, target){
			target || 
			(target = self.target) || 
			(target = new three.Vector3(0,0,0));
			var px = camera.position.x;
			var pz = camera.position.z;
			var magnitude = Math.sqrt(px * px + pz * pz);
			var angle = Math.atan2(pz, px) + dx * 2 * Math.PI / 360;
			camera.position.z = magnitude * Math.sin(angle);
			camera.position.x = magnitude * Math.cos(angle);
			camera.lookAt(target);
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
		camera.position.x *= factor;
		camera.position.y *= factor;
		camera.position.z *= factor;
		camera.lookAt(self.target);
	}

	this.enable();
};



	
