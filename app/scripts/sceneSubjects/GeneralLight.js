import * as THREE from 'three';

// Trying the old way to see performance impact
// Types: Directional, Hemisphere, Point, RectArea, Spot & Ambient(no helper)
const GeneralLight = function(scene, options) {
	const { type, hasHelper } = options;
	this.light = new THREE[`${type}Light`]('#22f', 1);

	if (hasHelper && type !== 'Ambient') {
		this.lightHelper = new THREE[`${type}LightHelper`](this.light);
		new THREE.PointLightHelper(this.light, 3, 0xff0000);
	}

	scene.add(this.light);
};

export default GeneralLight;
