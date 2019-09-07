// Create scene, camera, and renderer
// Initialise SceneSubjects - One scene entity
// Update every frame

import { Clock, WebGLRenderer, Scene, Color, PerspectiveCamera } from 'three';

import GeneralLights from './sceneSubjects/GeneralLights';

class SceneManager {
	constructor(canvas) {
		this.canvas = canvas;
		this.clock = new Clock();
		this.screenDimensions = {
			width: canvas.width,
			height: canvas.height,
		};

		this.scene = this.buildScene();
		this.renderer = this.buildRenderer(this.screenDimensions);
		this.camera = this.buildCamera(this.screenDimensions);
		this.updateableSubjects = [];
	}

	buildScene() {
		const newScene = new Scene();
		newScene.background = new Color('#000');

		return newScene;
	}

	buildRenderer({ width, height }) {
		const newRenderer = new WebGLRenderer({
			canvas: canvas,
			antialias: true,
			alpha: true,
		});

		const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
		newRenderer.shadowMap.enabled = true;
		newRenderer.setClearColor(0x000000, 0);
		newRenderer.setPixelRatio(DPR);
		newRenderer.setSize(width, height);

		newRenderer.gammeInput = true;
		newRenderer.gammaOutput = true;

		return newRenderer;
	}

	buildCamera({ width, height }) {
		const aspectRatio = width / height;
		const fieldOfView = 60;
		const nearPlane = 1;
		const farPlane = 10000;
		const newCamera = new PerspectiveCamera(
			fieldOfView,
			aspectRatio,
			nearPlane,
			farPlane
		);

		return newCamera;
	}

	addLight = () => new GeneralLights(this.scene);

	// TODO: Allow arrays too
	addToUpdate = subject => {
		if (subject.update) {
			this.updateableSubjects.push(subject);
		}
	};

	// TODO: Allow arrays too
	removeFromUpdate = subject => {
		const index = this.updateableSubjects.indexOf(subject);
		if (index >= 0) {
			this.updateableSubjects = [
				...this.updateableSubjects.slice(0, index),
				...this.updateableSubjects.slice(
					index + 1,
					this.updateableSubjects.length
				),
			];
		}
	};

	// Update all added subjects, update & pass elapsedtTime as param
	update() {
		const elapsedTime = this.clock.getElapsedTime();

		for (let sceneSubject of this.updateableSubjects) {
			sceneSubject.update(elapsedTime);
		}

		this.renderer.render(this.scene, this.camera);
	}

	onWindowResize() {
		const { width, height } = canvas;

		this.screenDimensions.width = width;
		this.screenDimensions.height = height;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(width, height);
	}
}

export default SceneManager;
