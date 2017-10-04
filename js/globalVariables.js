var scene, camera, renderer, light;
var raycaster, mouse;
var mousePos;
var activeObj;

var devModules = {
	controls: false,
	stats: false
};

var controlsPositions = {
    x: 0,
    y: 0,
    z: 0
};
var cameraPositions = {
    x: 0,
    y: 0,
    z: 500
}

var isWireframeMode = false;

var container = document.getElementById('scene');
var canvas;