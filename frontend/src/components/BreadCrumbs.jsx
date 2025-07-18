import { Link, useParams } from 'react-router-dom';

function titleFromSlug(slug) {
    return slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}


export default function Breadcrumbs() {
    const { slug } = useParams();

    return (
        <nav className="breadcrumb" style={{color: 'black'}}>
            {/* 1. Home */}
            <Link to="/">Home</Link>

            {/* 2. Curriculums */}
            <span className="breadcrumb-sep">/</span>
            <Link to="/curriculums">Curriculums</Link>

            {/* 3. (optional) Detail page */}
            {slug && (
                <>
                    <span className="breadcrumb-sep">/</span>
                    <span>{titleFromSlug(slug)}</span>
                </>
            )}
        </nav>
    );
}
