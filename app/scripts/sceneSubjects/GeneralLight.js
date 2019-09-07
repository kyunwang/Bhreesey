import * as THREE from 'three';

// Trying the old way to see performance impact
// Types: Directional, Hemisphere, Point, RectArea, Spot & Ambient(no helper)
const initialOptions = {
	type: 'Point',
	hasHelper: false,
	light: {
		color: 0x2222ff,
		intensity: 1,
	},
	lightHelper: {
		sphereSize: 3,
		color: 0xff0000,
	},
};

const GeneralLight = function(scene, args) {
	const options = { ...initialOptions, ...args };
	const { type, hasHelper, light, lightHelper } = options;
	this.light = new THREE[`${type}Light`](light.color, light.intensity);

	if (hasHelper && type !== 'Ambient') {
		this.lightHelper = new THREE[`${type}LightHelper`](this.light);
		new THREE.PointLightHelper(
			this.light,
			lightHelper.sphereSize,
			lightHelper.color
		);
	}

	scene.add(this.light);
};

export default GeneralLight;
