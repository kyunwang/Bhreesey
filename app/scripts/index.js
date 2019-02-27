import '../styles/index.css';
import SceneManager from './SceneManager';
import { createStats } from './utils/stats';

const stats = createStats();
const canvas = document.getElementById('canvas');
// Pass canvas so sceneManager is DOM independent
const sceneManager = new SceneManager(canvas);

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
