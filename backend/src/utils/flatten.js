

function flattenSections(sections, parentPath = []) {
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

module.exports = flattenSections