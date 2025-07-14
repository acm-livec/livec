
/**
 * Helper function to convert from `kebab-case` to `Title Case`
 * 
 * @example
 * toTitleCase('hello-world'); // 'Hello World'
 * 
 * @param {string} string 
 * @returns {string} The string in title case.
 */
export const toTitleCase = (string = '') => {
    return string.split('-')
        .map(item => item.charAt(0).toUpperCase() + item.substring(1))
        .join(' ');
};


export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
}


export const flattenSections = (sections, parentPath = []) => {
	let result = [];

	for (const section of sections) {
		const path = [...parentPath, section.title];

		const {units, ...rest} = section

		result.push({
			...rest,
			path: path
		});

		if (section.units && section.units.length > 0) {
			const children = flattenSections(section.units, path);
			result = result.concat(children);
		}
	}

	return result;
}
