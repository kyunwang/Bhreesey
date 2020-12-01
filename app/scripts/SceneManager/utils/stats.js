import Stats from 'stats.js';

export const createStats = (type = 0) => {
	const stats = new Stats();
	const panelType =
		typeof type !== 'undefined' && type && !isNaN(type) ? parseInt(type) : 0;

	stats.showPanel(panelType); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild(stats.dom);

	return stats;
};

const statsOptions = {
	condition: true,
	args: null,
};

export const checkStats = (stats, callback, options = statsOptions) => {
	if (!options.condition) {
		callback();
		return;
	}

	stats.begin();
	callback(options.args);
	stats.end();
};
