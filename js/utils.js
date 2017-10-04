function updateDevModules() {
	for (var module in devModules) {
		if (devModules[module]) {
			devModules[module].update();
		}
	}
}

function addOrbitControls() {
	devModules.controls = new THREE.OrbitControls(camera, renderer.domElement);
	devModules.controls.addEventListener('change', render);
	devModules.controls.maxPolarAngle = Math.PI / 2;
	devModules.controls.maxDistance = 2000;
}

function addStats() {
	devModules.stats = new Stats();
	document.body.appendChild(devModules.stats.dom);
}

function addEventListeners() {
	window.addEventListener('resize', onWindowResize, false);
	container.addEventListener('mousedown', onDocumentMouseDown, false);
	window.addEventListener('keydown', onDocumentKeyPress, false);
	window.addEventListener('mousewheel', updateLightPosition, false);
}

function compareObjByProp(prop, isDecreasing) {
	if (isDecreasing) {
		return (a, b) => {
			return b[prop] - a[prop];
		}
	} else {
		return (a, b) => {
			return a[prop] - b[prop];
		}
	}
}

function compare(a, b) {
	if (a < b)
		return -1;
	if (a > b)
		return 1;
	return 0;
}

function addPropsToObj(obj, propsObj) {
	for (let key in propsObj) {
		if (isArray(propsObj[key])) {
			obj[key] = [];
		} else if (typeof (propsObj[key]) == "object") {
			obj[key] = Object.assign({}, propsObj[key]);
		} else {
			obj[key] = propsObj[key];
		}
	}
}

function isArray(arr) {
	if (Object.prototype.toString.call(arr) === '[object Array]') {
		return true;
	}
	return false;
}

var QueryString = function () {
	// This function is anonymous, is executed immediately and
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
}();

var perfomanceOptimization = class perfomanceOptimization {
	constructor(frequency) {
		this.frequency = frequency;
		this.initDate = new Date();
		this.endDate = null;
		this.stabilization = null;
		this.stabilized = false;
	}

	checkEventIsUnavailable(func, initiator) {
		let self = this;
		if (this.stabilization) {
			clearTimeout(this.stabilization);
			this.stabilization = null;
		}

		if (this.stabilized) {
			this.stabilized = false;
			return false;
		}

		if (func) {
			this.stabilization = setTimeout(function () {
				if (initiator.state == "removed") return;
				self.stabilized = true;
				func();
			}, 120);
		}

		this.endDate = new Date();
		if (this.endDate - this.initDate < this.frequency) {
			return true;
		}
		this.initDate = new Date();
		return false;
	}
}

var optimizedFuncions = {
	orbitControls: new perfomanceOptimization(20)
};

function exportToObj() {
	var exporter = new THREE.OBJExporter();
	return exporter.parse(scene);
}

function makeTextFile(text) {
	var textFile = null;
	var data = new Blob([text], {
		type: 'text/plain'
	});

	if (textFile !== null) {
		window.URL.revokeObjectURL(textFile);
	}

	textFile = window.URL.createObjectURL(data);

	return textFile;
};

function loadScene() {
	var link = document.createElement('a');
	link.download = "scene.obj";
	link.href = makeTextFile(exportToObj());
	link.click();
}

function forceRemove(obj) {
	if (!obj) return;

	obj.traverse(function (child) {
		if (child instanceof THREE.Mesh) {
			if (child.material.map) {
				child.material.map.dispose();
				child.material.map = undefined;
			}

			child.material.dispose();
			child.material = undefined;

			child.geometry.dispose();
			child.geometry = undefined;
		}
	});
}