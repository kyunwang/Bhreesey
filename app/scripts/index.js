import '../styles/index.css';
import { noise } from './utils/perlin';

import SceneManager from './SceneManager';
import { createStats } from './utils/stats';
import { buildSphere, PerlinSphere } from './sceneSubjects/SceneSubject';

const stats = createStats();
const canvas = document.getElementById('canvas');

// Pass canvas so sceneManager is DOM independent
const sceneManager = new SceneManager(canvas);
const light = sceneManager.addLight();

const pSphere = new PerlinSphere(sceneManager.scene);
pSphere.mesh.position.set(0, 0, -3);
// pSphere.mesh.geometry.verticesNeedUpdate = true;

sceneManager.addToUpdate(pSphere);
// sceneManager.addToUpdate(light);
// console.log(sceneManager.updateableSubjects);
// sceneManager.removeFromUpdate(light);
// console.log(sceneManager.updateableSubjects);

function resizeCanvas() {
	canvas.style.width = '100%';
	canvas.style.height = '100%';

	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

	sceneManager.onWindowResize();
}

function bindEventListeners() {
	window.onresize = resizeCanvas;
	document.addEventListener('resize', () => {
		resizeCanvas();
	});

	resizeCanvas();
}

// Loop where custom subject update methods can be called in addition to the generic one
function render() {
	if (stats) {
		stats.begin();
	}

	sceneManager.update();

	if (stats) {
		stats.end();
	}

	requestAnimationFrame(render);
}

bindEventListeners();
render();
