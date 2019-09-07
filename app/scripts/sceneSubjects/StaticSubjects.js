export const buildIcosahedron = scene => {
	const radius = 0;
	const geometry = new IcosahedronBufferGeometry(radius, 2);
	const material = new MeshStandardMaterial({ flatShading: true });
	const mesh = new Mesh(geometry, material);

	scene.add(mesh);
	return mesh;
};

export const buildSphere = scene => {
	const geometry = new SphereGeometry(1, 128, 128);
	const material = new MeshNormalMaterial({ flatShading: true });
	const mesh = new Mesh(geometry, material);

	scene.add(mesh);
	return mesh;
};
