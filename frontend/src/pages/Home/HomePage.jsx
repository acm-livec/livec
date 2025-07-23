import "./style.css"
import { useEffect, useState, useMemo } from "react"
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { getCurriculum } from "@utils/api-handlers/curriculums/get-curriculum";
import { Disciplines } from "@utils/constants";

import PageEditor from "@features/details/Editor";

export default function HomePage() {
	const [html, setHtml] = useState([])

	return (
		<section className='home'>
			<ol className="ol-list">
				<li>Top-level item 1</li>
				<li>Top-level item 2
					<ol className="ol-list depth-1">
						<li>Nested item 1</li>
						<li>Nested item 2</li>
					</ol>
				</li>
				<li>Top-level item 3</li>
			</ol>
		</section>
	);

}

