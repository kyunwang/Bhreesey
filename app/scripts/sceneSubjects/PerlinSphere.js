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
import { noise } from '../SceneManager/utils/perlin';

class PerlinSphere {
	constructor(scene) {
		const geometry = new SphereGeometry(1, 256, 256);
		const material = new MeshNormalMaterial({ flatShading: false });
		// const material = new MeshLambertMaterial({ flatShading: false });
		const mesh = new Mesh(geometry, material);

		scene.add(mesh);
		this.mesh = mesh;

		// Variables
		this.amount = 1.5;
		this.animNumber = 1;
	}

	update = time => {
		if (!time) return;

		const { geometry } = this.mesh;

		this[`animTest${this.animNumber}`](geometry, time, this.amount);
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

export default PerlinSphere;
