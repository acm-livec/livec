// const curriculums = require("../database/data/curriculums/curriculums.json")
const fs = require('fs');

async function hashID(input) {
	const encoder = new TextEncoder();
	const data = encoder.encode(input);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
	return hashHex;
}


const generateSectionId = async ({ curriculum, year_version, page_number, slug, section_version }) => {
	// Use these values here
	console.log(curriculum, year_version, page_number, slug, section_version);
	// Build your ID however you like:
	const input = `${curriculum}:${year_version}:${page_number}:${slug}:${section_version}`;
	return (await hashID(input)).slice(0, 12); // Short stable ID
}


// const generateSectionId = async ({meta}) => {
// 	const input = `${curriculum}:${yearVersion}:${pageNumber}:${sectionTitle}:${sectionVersion}`;
// 	console.log(input)
// 	return (await hashID(input)).slice(0, 12); // Short stable ID
// }





function flattenSections(sections, parentPath = []) {
	let result = [];

	for (const section of sections) {
		const path = [...parentPath, section.title];

		const { units, ...rest } = section

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

const format = (str) => {
	if (!str) return '';

	return str.trim().toLowerCase().split(/[\s,\/\-;]+/).map(s => s.replace(/[^\w]/g, '')).join('-');
};



async function buildSections(sections, currentSection = {}, index = 0) {
	const result = [];

	for (const section of sections) {
		const cleanedTitle = format(section.title);

		const meta = {
			curriculum: "computer-science",
			year_version: "2023",
			section_version: "v1",
			previous_versions: section.meta?.previous_versions || [],
			slug: cleanedTitle,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		currentSection = {
			id: section.id || await generateSectionId({ ...meta, page_number: section.page_number }),
			title: section.title,
			page_number: section.page_number,
			markdown_heading: section.markdown_heading || '',
			markdown_body: section.markdown_body || '',
			html: section.html || '',
			meta: meta,
			units: [],
		};

		if (section.units && section.units.length > 0) {
			const [children, updatedIndex] = await buildSections(section.units, {}, index);
			currentSection.units = children;
			index = updatedIndex; 
		} else {
			currentSection.index = index;
			index++;
		}

		result.push(currentSection);
	}

	return [result, index];
}



const Build = async (params) => {
	const rawData = fs.readFileSync('../database/data/curriculums/curriculums.json', 'utf-8');
	const curriculums = JSON.parse(rawData);
	const [build] = await buildSections(curriculums);
	fs.writeFileSync(
		'built_sections.json',
		JSON.stringify(build, null, 4),
		'utf-8'
	);

	return build
}

const Flatten = () => {
	const rawData = fs.readFileSync('./built_sections.json', 'utf-8');
	const curriculums = JSON.parse(rawData);
	const flat = flattenSections(curriculums);
	fs.writeFileSync(
		'flattened_sections.json',
		JSON.stringify(flat, null, 4),
		'utf-8'
	);

	return flat
}

// Build().then(console.log)


const obj = {
	// isFirst: true
}

console.log(!!(obj?.isFirst || false))
console.log(obj?.isLast || false)



