import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { userService } from '../../services/user.services';
import { useUserStore } from '../../store/user.store';
import ROUTES from '../../routes/routesModel';
import { Link } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const { user, setUser } = useUserStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onLogOut = () => {
        if (user) {
            setUser(undefined);
            navigate('/');
            userService.logout();
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (
        <div>
            <header className='header'>
                <Box className='logo'>
                    <img src="https://www.svgrepo.com/show/765/library.svg" alt="library img" className='imgLogo' />
                    <Link to={ROUTES.ROOT} className='a-logo'>ChapterCloud</Link>
                </Box>


                <div className="hamburger" onClick={toggleMenu}>
                    &#9776;
                </div>

                <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                    <ul className='ul'>
                        <li className='li'><Link to={ROUTES.ROOT} className='a-li'>HOME</Link></li>
                        {user && <li className='li'><Link to={ROUTES.FAVORITES} className='a-li'>FAVORITES</Link></li>}
                        <li className='li'><Link to={ROUTES.ABOUT} className='a-li'>ABOUT</Link></li>
                        {(user?.isBusiness || user?.isAdmin) && <li className='li'><Link to={ROUTES.ADD_BOOK} className='a-li'>ADD BOOK</Link></li>}
                        {(user?.isAdmin) && <li className='li'><Link to={ROUTES.ADMIN} className='a-li'>CRM</Link></li>}
                        {user ? <li className='li'><p className='a-li' onClick={onLogOut}>LOGOUT</p></li> : <li className='li'><Link to={ROUTES.LOGIN_SIGNUP} className='a-li'>LOGIN</Link></li>}
                    </ul>
                </nav>
            </header>
        </div>
    );
}
