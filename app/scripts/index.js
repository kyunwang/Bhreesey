import '../styles/index.css';

import { createStats, checkStats } from './SceneManager/utils/stats';
import { createDatGUI } from './SceneManager/utils/dat.gui';
import { bindEventListeners, debounce } from './SceneManager/utils/helpers';
import GeneralLight from './SceneManager/GeneralSubjects/GeneralLight';
import PerlinSphere from './sceneSubjects/PerlinSphere';
import SceneManager from './SceneManager/SceneManager';

const canvas = document.getElementById('canvas');

const sceneManager = new SceneManager(canvas);
const pSphere = new PerlinSphere(sceneManager.scene);
pSphere.mesh.position.set(0, 0, -3);

const light = new GeneralLight(sceneManager.scene, {
	type: 'Ambient',
	hasHelper: true,
});

sceneManager.addToUpdate([pSphere]);

// Creat stats & gui
const stats = createStats();
const gui = createDatGUI();
gui.add(pSphere, 'amount', 0.5, 2.5, 0.1);
gui.add(pSphere, 'animNumber', { animationOne: 1, animationTwo: 2 });

// setTimeout(() => {
// 	sceneManager.removeFromUpdate([pSphere]);
// }, 3000);

const onResize = debounce(() => {
	sceneManager.onWindowResize();
}, 300);

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
