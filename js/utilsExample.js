//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~TEXTURE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//example for auto repeate texture
//
//update('y', 'height', 'y', 500);
//function update(repeat, parameters, scale, coeff) {
//	obj.material.map.repeat[repeat] = obj.geometry.parameters[parameters] * obj.scale[scale] * coeff / obj.material.map.image[parameters];
//}
//

//get custom texture from textures storage (loaded from db) for class
//
//	static getTextures() {
//		this.materials = texturesInfo.filter(item => { return item.type === this.name });
//		let newTexture = this.materials[0];
//		this.texture = newTexture.texture;
//		this.texture.objType = newTexture.type;
//		this.texture.imageSrc = newTexture.imageSrc;
//	}






//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CAMERA~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//props: 
//	position
//	lookAt
//	zoom
//	updateProjectionMatrix