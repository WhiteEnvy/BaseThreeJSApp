var simpleCubes = {
	objects: {},
	add: (obj) => {
		simpleCubes.objects[obj.uuid] = obj
	},
	remove: (uuid) => {
		delete simpleCubes.objects[uuid]
	}
};

var simpleCube = class simpleCube {
	constructor(width, height, depth) {
		this.name = "simpleCube";
		this.state = "new";
		this.width = width || 20;
		this.height = height || 20;
		this.depth = depth || 20;
		this.color = 0xffc400;
		//this.texture = cloneTexture(simpleCube.texture);
		this.boundingBox = undefined,
			this.secondaryProps = {
				castShadow: true,
				receiveShadow: true
			}
	}

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
		let newObj = this,
			view = createCubeGeom(newObj);

		this.setTHREEobj(view);
		simpleCubes.add(this);
		scene.add(view);

		this.textureUpdate();

		elementEvents.customEvent.dispatch();
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
		} else {
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

	textureUpdate(x, y, z) {
		if (!this.THREEobj.material.map) return;
		let obj = this.THREEobj;

		if (x) {
			obj.material.map.repeat.x = x;
		}
		if (y) {
			obj.material.map.repeat.y = z;
		}
		if (z) {
			obj.material.map.repeat.y = z;
		}
	}
}