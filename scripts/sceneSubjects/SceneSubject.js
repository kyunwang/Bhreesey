import { Mesh, IcosahedronBufferGeometry, MeshStandardMaterial } from 'three';

class SceneSubject {
	constructor(scene) {
		const radius = 2;
		const geometry = new IcosahedronBufferGeometry(radius, 2);
		const material = new MeshStandardMaterial({ flatShading: true });

		this.mesh = new Mesh(geometry, material);

		this.mesh.position.set(0, 0, -20);
		scene.add(this.mesh);

		this.update = this.update.bind(this);
	}

	update(time) {
		const scale = Math.sin(time) + 2;
		this.mesh.scale.set(scale, scale, scale);
	}
}

export default SceneSubject;
