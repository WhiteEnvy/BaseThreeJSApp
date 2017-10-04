//function getAllTextures() {
//  $.ajax({
//    url: '/api/wardrobe/getMaterials',
//    method: 'GET'
//  }).done((data) => {
//    for (let i = 0; i < data.materials.length; i++) {
//      let newTextureObj = data.materials[i];
//      let texture = new THREE.TextureLoader().load(`./images/textures/new-textures/${newTextureObj.imageSrc}`);
//      texture.wrapS = THREE.RepeatWrapping;
//      texture.wrapT = THREE.RepeatWrapping;
//      newTextureObj.texture = texture;
//      texturesInfo[i] = newTextureObj;
//    }
//    getTextures();
//  })
//}

function copyTexture (obj) {
	let texture = obj.texture.clone();	
	texture.imageSrc = obj.imageSrc;
	texture.objType = obj.type;
	return texture;
}

function cloneTexture(texture) {
	let newTexture = {};

	for (let prop in texture) {
		if (prop != "repeat") {
			newTexture[prop] = texture[prop];
		} else {
			newTexture.repeat = new THREE.Vector2(1,1);
		}
	}

	return newTexture;
}

function changeTextures(src) {
	let newTexture = texturesInfo.filter(item => { return item.imageSrc === src })[0];
	shelf.texture = cloneTexture(newTexture);
	shelf.texture.needsUpdate = true;

	for (let key in shelves.objects) {
		shelves.objects[key].textureChange(newTexture.texture);
	}
}