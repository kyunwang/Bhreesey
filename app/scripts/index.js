import '../styles/index.css';

import { createStats, checkStats } from './SceneManager/utils/stats';
import { bindEventListeners, debounce } from './SceneManager/utils/helpers';
import GeneralLight from './SceneManager/GeneralSubjects/GeneralLight';
import PerlinSphere from './sceneSubjects/PerlinSphere';
import SceneManager from './SceneManager/SceneManager';

const stats = createStats();
const canvas = document.getElementById('canvas');

const sceneManager = new SceneManager(canvas);
const pSphere = new PerlinSphere(sceneManager.scene);
pSphere.mesh.position.set(0, 0, -3);

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

const onResize = debounce(() => {
	sceneManager.onWindowResize();
}, 300);

const eventListeners = [
	{
		type: 'resize',
		callback: onResize,
		target: window,
	},
];

// Loop where custom subject update methods can be called in addition to the generic one
function render() {
	checkStats(stats, update);
	requestAnimationFrame(render);
}

// Everything we want to update can be placed here
function update() {
	sceneManager.update();
}

bindEventListeners(eventListeners);
render();

sceneManager.onWindowResize();
