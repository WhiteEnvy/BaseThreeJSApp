function createArrow(obj) {
	let direction, length, arrow;
	let {from, to, color} = obj;
	
	let arrowFrom = new THREE.Vector3(from.x, from.y, from.z);
	let arrowTo = new THREE.Vector3(to.x, to.y, to.z);
	direction = arrowTo.clone().sub(arrowFrom);
	length = direction.length();
	arrow = new THREE.ArrowHelper(direction.normalize(), arrowFrom, length, 0xff0000, 6, 12);
	return arrow; 
}

function createBoxGeom(obj, color = 0xffc400) {
	var geometry,
		material,
		mesh;

	material = new THREE.MeshBasicMaterial({
		color: color,
		transparent: true,
		opacity: obj.opacity || 1
	});

	geometry = new THREE.BoxBufferGeometry(obj.x, obj.y, obj.z);

	mesh = new THREE.Mesh(geometry, material);

	return mesh;
}


function createCylinderGeom(obj) {
	let { height, radialSegments, radiusBottom, radiusTop, color, texture } = obj,
		geometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments),
//		material = new THREE.MeshPhongMaterial({transparent: true, specular: 0xffffff});
		material = new THREE.MeshStandardMaterial({transparent: true, roughness: .5});
	if(texture) {
		material.map = texture;
		texture.needsUpdate = true;
	};
	if(color) material.color.setHex(color);
	
	let cylinder = new THREE.Mesh(geometry, material);
	
	addPropsToObj(cylinder, obj.secondaryProps);
	
	return cylinder;
}

function createCubeGeom(obj) {
	let {width, height, depth, texture, color, material, geometry} = obj,
        mesh;
        
	material = material || new THREE.MeshStandardMaterial({transparent: true, roughness: .63});
    
    if(texture){
        material.map = texture;
        texture.needsUpdate = true;
    }
    if(color){
        material.color.setHex(color);
    }	
    
	geometry = geometry || new THREE.CubeGeometry(width, height, depth, 1, 1, 1);
	geometry.verticesNeedUpdate = true;    
	mesh = new THREE.Mesh(geometry, material);
    
	if(obj.secondaryProps) {        
		addPropsToObj(mesh, obj.secondaryProps);
	}
    
	return mesh;
}

function createLineGeom(obj) {
	let {from, to, color} = obj;
	
	from = from || {x:0,y:0,z:0};
	to = to || {x:1,y:0,z:0};
	
	let material = new THREE.LineBasicMaterial({color: color});
	let geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(from.x, from.y, from.z),
		new THREE.Vector3(to.x, to.y, to.z)
	);

	let line = new THREE.Line(geometry, material);
	return line;
}

function createTrinagle(obj) {
	let geometry, material, triangle;
 
	geometry = new THREE.Geometry();
	 
	let v1 = new THREE.Vector3(0, 0, 0),
		v2 = new THREE.Vector3(-2, 5, 0),
		v3 = new THREE.Vector3(2, 5, 0);	

	geometry.vertices.push(v1);
	geometry.vertices.push(v2);
	geometry.vertices.push(v3);

	geometry.faces.push(new THREE.Face3(0, 1, 2));
	geometry.computeFaceNormals();

	material = new THREE.MeshBasicMaterial({
		color: 0xff0000
	});

	triangle = new THREE.Mesh(geometry, material);
	triangle.material.side = THREE.DoubleSide;	 

	return triangle;
}


function createText(text, color=0xff0000, size=5) {
	let textGeo = new THREE.TextGeometry(text, {
		font: measurement.font,
		size: size,
		height: 0
	});
	let textMaterial = new THREE.MeshPhongMaterial({
		color: color
	});
	let newText = new THREE.Mesh(textGeo, textMaterial);
	return newText;
}

function createWireFrameObject(obj, material, sColor) {
    let geom = new THREE.EdgesGeometry(obj.geometry),
		color = sColor || 0xff0000,
        mat = material ? material : new THREE.MeshBasicMaterial({color: color}),
        mesh = new THREE.LineSegments(geom, mat);
    return mesh;
}


//rotation 90deg 
//someObject.rotation.set(0, Math.PI, Math.PI / 2);

