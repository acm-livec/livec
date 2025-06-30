import './Header.css'

import { useContext } from 'react';
import { UserContext } from '@context/UserProvider';
import { Link, useNavigate } from 'react-router-dom';

import acmLogo from '@assets/acm.png'


export default function Header() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()


    return (
        <header>
            <div className='flex center gap-1r' onClick={() => navigate('/')}>
                <div className='logo'>
                    <img className='logo__img ' src={acmLogo}></img>
                </div>
                <h1 className='site-name monts'>LiveC</h1>
            </div>

            <nav className='navigation'>
                <Link className='navigation-item' to={'/'}>Home</Link>
                <Link className='navigation-item' to={'/curriculums'}>Curriculums</Link>
                {user ?
                    <Link className='navigation-item' to={`/dashboard/${user.id}/overview`}>Profile</Link>
                    :
                    <Link className='navigation-item' to={'/auth'}>Join</Link>
                }
            </nav>
        </header>
    )
}
