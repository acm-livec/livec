import './CurriculumPage.scss'

import { useNavigate } from 'react-router-dom'

import Breadcrumbs from '@components/BreadCrumbs';


const curriculums = [
    { name: 'Computer Science', slug: 'computer-science' },
    { name: 'Information Systems', slug: 'information-systems' },
    { name: 'Cybersecurity', slug: 'cybersecurity' },
    { name: 'Computing Curricula', slug: 'computing-curricula' },
    { name: 'Information Technology', slug: 'information-technology' },
    { name: 'Computer Engineering', slug: 'computer-engineering' },
    { name: 'Data Science', slug: 'data-science' },
    { name: 'Software Engineering', slug: 'software-engineering' },
]

export default function CurriculumPage() {
	const navigate = useNavigate();

	// TODO: extract all storage to seperate util handler
	const handleClick = (curriculum, slug) => {
		sessionStorage.setItem('curriculum', curriculum)
		sessionStorage.setItem('curriculumSlug', slug)
		navigate(`/curriculums/${slug}/details`)
	}

	return (
		<div className='curricula-page'>
			<Breadcrumbs/>
			<h1 className='curricula-page__heading'>Choose a curriculum</h1>
			<div className='card__grid'>
				{curriculums.map((item, indx) => (
					<div key={indx * 13} className='card' onClick={() => handleClick(item.name, item.slug)}>
						<h2 className='card__heading'>{item.name}</h2>
						<p className='card__desc'>{`Explore the ${item.name} curriculum`}</p>
					</div>
				))}
			</div>
		</div>
	)
}
