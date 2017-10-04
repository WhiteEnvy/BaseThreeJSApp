init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(55, container.offsetWidth / container.offsetHeight, 0.1, 3000);
	camera.position.copy(cameraPositions);
	
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	createLight();
	updateLightPosition();
	
	renderer = new THREE.WebGLRenderer({
//		alpha: true,
		antialias: true,
		preserveDrawingBuffer: true
	});
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	renderer.setClearColor(0xffffff);
	renderer.shadowMapEnabled = true;
	container.appendChild(renderer.domElement);
    canvas = document.getElementsByTagName('canvas')[0];
	addStats();
	addOrbitControls();
	addEventListeners();
	resetControlsPotision();
	
	new simpleCube(50,50,50).draw();
}

function animate() {
	requestAnimationFrame(animate);
	render();
	updateDevModules();
}

function render() {
	renderer.render(scene, camera);
}