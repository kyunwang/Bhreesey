import { PointLight } from 'three';
import GeneralLights from './GeneralLights';

class GeneralLights {
	constructor(scene) {
		this.light = new PointLight('#22f', 1);
		scene.add(this.light);

		this.update = this.update.bind(this);
	}

	update(time) {
		this.light.intensity = (Math.sin(time) + 1.5) / 1.5;
		this.light.color.setHSL(Math.sin(time), 0.5, 0.5);
	}
}

export default GeneralLights;
