export const isArray = array => Array.isArray(array);

export const bindEventListeners = events => {
	if (!isArray(events)) return;

	events.forEach(event => {
		const { type, callback, target } = event;
		target.addEventListener(type, callback);
	});
};

export const unbindEventListeners = events => {
	if (!isArray(events)) return;

	events.forEach(event => {
		const { type, callback, target } = event;
		target.removeEventListener(type, callback);
	});
};

export const debounce = (callback, wait) => {
	let timeout;
	return (...args) => {
		const context = this;
		clearTimeout(timeout);
		timeout = setTimeout(() => callback.apply(context, args), wait);
	};
};
