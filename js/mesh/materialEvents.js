function setSelectionOpacity() {
	removeSelectionOpacity();
	let {
		firstUuid, secondUuid
	} = activeObj.THREEobj.positionType === 'vertical' ? activeObj.findTwoClosestPointsByX() : activeObj.findTwoClosestPointsByY();

	for (let key in allSceneObjects) {
		if (key != firstUuid && key != secondUuid && key != activeObj.THREEobj.uuid) {
			for (let i = 0; i < allSceneObjects[key].THREEobj.children.length; i++) {
				if (allSceneObjects[key].name === 'drawer') {
					allSceneObjects[key].THREEobj.children.forEach(function (itemGroup) {
						itemGroup.children.forEach(function (item) {
							item.material.opacity = 0.5;
						})
					})
					break;
				}
				allSceneObjects[key].THREEobj.children[i].material.opacity = 0.5;
			}
		}
	}
}

function removeSelectionOpacity() {
	concatAllSceneObj();
	for (let key in allSceneObjects) {
		for (let i = 0; i < allSceneObjects[key].THREEobj.children.length; i++) {
			if (allSceneObjects[key].name === 'drawer') {
				allSceneObjects[key].THREEobj.children.forEach(function (itemGroup) {
					itemGroup.children.forEach(function (item) {
						item.material.opacity = 1;
					})
				})
				break;
			}
			if (allSceneObjects[key].THREEobj.children[i].material !== undefined && allSceneObjects[key].THREEobj.children[i].objectType !== 'boundingBox') {
				allSceneObjects[key].THREEobj.children[i].material.opacity = 1;
			}
		}
	}
}

function changeWireFrame() {
	concatAllSceneObj();
	isWireframeMode = !isWireframeMode;
	for (let key in allSceneObjects) {
		for (let i = 0; i < allSceneObjects[key].THREEobj.children.length; i++) {
			if (allSceneObjects[key].name === 'drawer') {
				allSceneObjects[key].THREEobj.children.forEach(function (itemGroup) {
					itemGroup.children.forEach(function (item) {
						item.material.wireframe = isWireframeMode;
					})
				})
				break;
			}
			if (allSceneObjects[key].THREEobj.children[i].material !== undefined && allSceneObjects[key].THREEobj.children[i].objectType !== 'boundingBox') {
				allSceneObjects[key].THREEobj.children[i].material.wireframe = isWireframeMode;
			}
		}
	}
}