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
		const geometry = new SphereGeometry(1, 256, 256);
		const material = new MeshNormalMaterial({ flatShading: false });
		// const material = new MeshLambertMaterial({ flatShading: false });
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

		this.animTest1(geometry, time, amount);
		// this.animTest2(geometry,time, amount);

		geometry.verticesNeedUpdate = true;
		geometry.computeVertexNormals();
		geometry.normalsNeedUpdate = true;
	};

	animTest1 = (geometry, time, amount) => {
		for (let index = 0; index < geometry.vertices.length; index++) {
			const vertice = geometry.vertices[index];
			const verticeNoise =
				0.3 *
				noise.perlin3(
					vertice.x * amount + time,
					vertice.y * amount,
					vertice.z * amount
				);

			vertice
				.normalize() // Keep in place
				.multiplyScalar(verticeNoise + 1);
		}
	};

	animTest2 = (geometry, time, amount) => {
		for (let index = 0; index < geometry.faces.length; index++) {
			const uv = geometry.faceVertexUvs[0][index]; // An array in another array
			const face = geometry.faces[index];
			const vertice = geometry.vertices[face.a]; // The first vertex of each face
			const verticeNoise =
				0.3 * noise.perlin3(uv[0].x * amount, uv[0].y * amount, time);

			vertice
				.normalize() // Keep in place
				.multiplyScalar(verticeNoise + 1);
		}
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
