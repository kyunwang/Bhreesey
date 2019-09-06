import {
	Mesh,
	IcosahedronBufferGeometry,
	MeshStandardMaterial,
	SphereGeometry,
	MeshNormalMaterial,
} from 'three';

export class PerlinSphere {
	constructor(scene) {
		const geometry = new SphereGeometry(1, 128, 128);
		const material = new MeshNormalMaterial({ flatShading: true });
		const mesh = new Mesh(geometry, material);

		scene.add(mesh);
		this.mesh = mesh;
	}

	update = time => {
		if (!time) return;

		// const scale = Math.sin(time) + 2;
		// this.mesh.scale.set(scale, scale, scale);

		for (let index = 0; index < this.mesh.geometry.vertices.length; index++) {
			const element = this.mesh.geometry.vertices[index];
		}

		this.mesh.geometry.verticesNeedUpdate = true;
	};
}

export const buildIcosahedron = scene => {
	const radius = 0;
	const geometry = new IcosahedronBufferGeometry(radius, 2);
	const material = new MeshStandardMaterial({ flatShading: true });
	const mesh = new Mesh(geometry, material);

	scene.add(mesh);
	return mesh;
};

export const buildSphere = scene => {
	const radius = 0;
	const geometry = new SphereGeometry(1, 128, 128);
	const material = new MeshNormalMaterial({ flatShading: true });
	const mesh = new Mesh(geometry, material);

	scene.add(mesh);
	return mesh;
};
