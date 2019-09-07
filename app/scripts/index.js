import '../styles/index.css';

import { createStats, checkStats } from './SceneManager/utils/stats';
import { PerlinSphere } from './sceneSubjects/SceneSubject';
import GeneralLight from './sceneSubjects/GeneralLight';
import SceneManager from './SceneManager/SceneManager';
import { bindEventListeners } from './SceneManager/utils/helpers';

const stats = createStats();
const canvas = document.getElementById('canvas');

const sceneManager = new SceneManager(canvas);
const pSphere = new PerlinSphere(sceneManager.scene);
pSphere.mesh.position.set(0, 0, -3);
// pSphere.mesh.geometry.verticesNeedUpdate = true;

const light = new GeneralLight(sceneManager.scene, {
	type: 'Ambient',
	hasHelper: true,
	// light: {
	// 	color: 'red',
	// 	intensity: 0.1,
	// },
});

sceneManager.addToUpdate([pSphere]);

// setTimeout(() => {
// 	sceneManager.removeFromUpdate([pSphere]);
// }, 3000);

function resizeCanvas(e) {
	sceneManager.onWindowResize();
}

const eventListeners = [
	{
		type: 'resize',
		callback: resizeCanvas,
		target: window,
	},
];

// Loop where custom subject update methods can be called in addition to the generic one
function render() {
	checkStats(stats, update);

	requestAnimationFrame(render);
}

function update() {
	sceneManager.update();
}

bindEventListeners(eventListeners);
resizeCanvas();
// bindEventListeners();
render();
