// from https://gist.github.com/Salakar/1d7137de9cb8b704e48a
// Example usages:
// mergeDeep(this, { a: { b: { c: 123 } } });
// or
// const merged = mergeDeep({a: 1}, { b : { c: { d: { e: 12345}}}});  
// console.dir(merged); // { a: 1, b: { c: { d: [Object] } } }

/**
 * Simple is object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
	return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
export function mergeDeep(target, source) {
	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach(key => {
				if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
				} else {
				Object.assign(target, { [key]: source[key] });
				}
				});
	}
	return target;
}
