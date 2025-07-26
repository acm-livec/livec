/**
 * Helper function to convert from `kebab-case` to `Title Case`
 *
 * @param {string} string
 * @returns {string} The string in title case.
 *
 * @example
 * toTitleCase('hello-world'); // 'Hello World'
 */
export const toTitleCase = (string = '') => {
    return string
        .split('-')
        .map((item) => item.charAt(0).toUpperCase() + item.substring(1))
        .join(' ');
};

/**
 * Converts snake_case keys to camelCase recursively.
 * @param {Object|Array} data - The data to convert.
 * @returns {Object|Array} - Converted object or array.
 */
export function snakeToCamel(data) {
    if (Array.isArray(data)) {
        return data.map(snakeToCamel);
    }

    if (data !== null && typeof data === 'object') {
        return Object.entries(data).reduce((acc, [key, value]) => {
            const camelKey = key.replace(/_([a-z])/g, (_, char) =>
                char.toUpperCase()
            );
            acc[camelKey] = snakeToCamel(value);
            return acc;
        }, {});
    }

    return data;
}

/**
 *
 * @param {string} date
 * @returns {string} -formatted date
 */
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
};

export function flattenSections(sections, parentPath = []) {
    let result = [];

    for (const section of sections) {
        const path = [...parentPath, section.title];

        const { units, ...rest } = section;

        if (section.units.length === 0) {
            result.push({
                ...rest,
                path: path,
            });
        }

        if (section.units && section.units.length > 0) {
            const children = flattenSections(section.units, path);
            result = result.concat(children);
        }
    }

    return result;
}
