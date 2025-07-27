import './CurriculumPage.scss';

import { useNavigate } from 'react-router-dom';

import Breadcrumbs from '@components/BreadCrumbs';
import { Disciplines } from '@docs/constants/disciplines';
import { toTitleCase } from '@utils/format';

const curriculums = Object.values(Disciplines);

export default function CurriculumPage() {
    const navigate = useNavigate();

    // TODO: extract all storage to seperate util handler
    const handleClick = (curriculum) => {
        sessionStorage.setItem('curriculum', curriculum);
        navigate(`/curriculums/${curriculum}/details`);
    };

    return (
        <div className="curricula-page">
            <Breadcrumbs />
            <h1 className="curricula-page__heading">Choose a curriculum</h1>
            <div className="card__grid">
                {curriculums.map((curriculum, indx) => {
                    const formattedCurriculum = toTitleCase(curriculum);
                    return (
                        <div
                            key={curriculum + indx}
                            className="card"
                            onClick={() => handleClick(curriculum)}
                        >
                            <h2 className="card__heading">
                                {formattedCurriculum}
                            </h2>
                            <p className="card__desc">{`Explore the ${formattedCurriculum} curriculum`}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
