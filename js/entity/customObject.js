var simpleCubes = {
	objects: {},
	add: (obj) => {simpleCubes.objects[obj.uuid] = obj},
	remove: (uuid) => {delete simpleCubes.objects[uuid]}
};

var simpleCube = class simpleCube {
	constructor(width, height, depth) {
		this.name = "simpleCube";
		this.state = "new";
		this.width = width || 20;
		this.height = height || 20;
		this.depth = depth || 20;
		this.color = 0xffc400;
//		this.texture = cloneTexture(simpleCube.texture);
		this.boundingBox = undefined,
		this.secondaryProps = {
			castShadow: true,
			receiveShadow: true
		}
	}

//	static getTextures() {
//		this.materials = texturesInfo.filter(item => { return item.type === this.name });
//		let newTexture = this.materials[0];
//		this.texture = newTexture.texture;
//		this.texture.objType = newTexture.type;
//		this.texture.imageSrc = newTexture.imageSrc;
//	}
	
	setTHREEobj(obj) {
		this.THREEobj = obj;
		this.uuid = obj.uuid;
	}

	remove() {
		scene.remove(this.THREEobj);
		simpleCubes.remove(this.uuid);
		forceRemove(this.THREEobj);
		activeObj = null;
	}

	draw() {
        elementEvents.customEvent.dispatch();
		let newObj = this;
		var view = createCubeGeom(newObj);
		this.setTHREEobj(view);
		simpleCubes.add(this);
		scene.add(view);
		
		this.textureUpdate();

		return this;
	}

	move(pos) {
		this.THREEobj.position.x = pos.x;
		this.THREEobj.position.y = pos.y;
	}
	
	setColor(color, isGroup) {
		if (isGroup) {
			this.THREEobj.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					child.material.color.setHex(color);
				}
			});
		}
		else{
			this.THREEobj.material.color.setHex(color);
		}		
	}
	
	textureChange(newTexture) {
		let repeatX = this.THREEobj.material.map.repeat.x;
		let repeatY = this.THREEobj.material.map.repeat.y;

		this.THREEobj.material.map = cloneTexture(newTexture);
		this.THREEobj.material.map.needsUpdate = true;

		this.THREEobj.material.map.repeat.x = repeatX;
		this.THREEobj.material.map.repeat.y = repeatY;
	}
	
	textureUpdate(coordinate, repeatCoefficient = 5) {
		if(!this.THREEobj.material.map) return;
		
		const obj = this.THREEobj;
		const repeatCoefficientZ = repeatCoefficient * 100;

		if (coordinate === 'x') {
			return update('x', 'width', 'x', repeatCoefficient);
		}

		if (coordinate === 'y') {
			return update('y', 'height', 'y', repeatCoefficient);
		}

		if (obj.positionType === 'vertical' || obj.positionType === 'horizontal') {
			update('y', 'height', 'z', repeatCoefficientZ);
			update('x', 'width', 'x', repeatCoefficient);
		}

		function update(repeat, parameters, scale, coeff) {
			obj.material.map.repeat[repeat] = obj.geometry.parameters[parameters] * obj.scale[scale] * coeff / obj.material.map.image[parameters];
		}
	}	
}
