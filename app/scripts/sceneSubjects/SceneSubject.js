import {
	Mesh,
	IcosahedronBufferGeometry,
	MeshStandardMaterial,
	SphereGeometry,
	MeshNormalMaterial,
	MeshLambertMaterial,
	MeshDepthMaterial,
	MeshDistanceMaterial,
} from 'three';

import { noise } from '../utils/perlin';

export class PerlinSphere {
	constructor(scene) {
		const geometry = new SphereGeometry(1, 128, 128);
		const material = new MeshNormalMaterial({ flatShading: false });
		// const material = new MeshLambertMaterial({ flatShading: false });
		// const material = new MeshDepthMaterial({ flatShading: false });
		// const material = new MeshDistanceMaterial({ flatShading: false });

		const mesh = new Mesh(geometry, material);

		scene.add(mesh);
		this.mesh = mesh;
	}

	update = time => {
		if (!time) return;
		const { geometry } = this.mesh;

		// const scale = Math.sin(time) + 2;
		// this.mesh.scale.set(scale, scale, scale);
		const amount = 1.5;

		for (let index = 0; index < geometry.vertices.length; index++) {
			const vertice = geometry.vertices[index];
			const verticeNoise =
				0.3 *
				noise.perlin3(
					vertice.x * amount,
					vertice.y * amount,
					vertice.z * amount
				);

			vertice
				.normalize() // Keep in place
				.multiplyScalar(verticeNoise + 1);
		}

		geometry.verticesNeedUpdate = true;
		geometry.computeVertexNormals();
		geometry.normalsNeedUpdate = true;
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
