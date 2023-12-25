import classes from './MainNavigation.module.css';

import Burger from '../UI/Burger';
import Avatar from '../UI/Avatar';
import  { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { loginModalActions } from '../store/modal-login-state-slice';
import { logoutModalActions } from '../store/modal-logout-state-slice';
import { navMobileActions } from '../store/nav-mobile-slice';
import { NavLink }  from 'react-router-dom';

function MainNavigation() {
    const dispatch = useDispatch();
    const navMobileOpen = useSelector(state => state.navMobile.navMobileOpen);
    const loggedIn = useSelector(state => state.loginState.loggedin);
    const loggedInUser = useSelector(state => state.loginState.loggedinUser);
    const [subMenuOpen, setSubMenuOpen] = useState(false);

    const closeMobileNavigation = () => {
        dispatch(navMobileActions.closeNavMobile());
    }

    const openLogin = () => {
        dispatch(loginModalActions.openLoginModal());
    }

    const openLogout = () => {
        dispatch(logoutModalActions.openLogoutModal());
    }

    const toggleSubmenu = () => {
        setSubMenuOpen(!subMenuOpen);
    }

    return(
        <>
            <Burger />
            <nav className={classes.navDesktop} >
                <ul className={classes.navInner}>
                    <li className={classes.navItem}>
                        <NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined} end >
                            Home
                        </NavLink>
                    </li>
                    <li className={classes.navItem}>
                        <NavLink to='/books' className={({ isActive }) => isActive ? classes.active : undefined} >
                            Books
                        </NavLink>
                    </li>
                    { loggedIn === 1 &&
                        <li className={classes.navItem}>
                            <NavLink to='/collections' className={({ isActive }) => isActive ? classes.active : undefined} >
                                Collections
                            </NavLink>
                        </li>
                    }
                    { loggedIn !== 1 && 
                        <li className={classes.navItem} onClick={openLogin}>
                            <p>Login</p>
                        </li> 
                    }
                    { loggedIn === 1 &&
                        <li className={[classes.navItem, classes.navItemSubmenu].join(' ')} onClick={toggleSubmenu}>
                            <Avatar className={classes.mainNavigationAvatar} bg={loggedInUser.avatarColour} label={loggedInUser.firstname.charAt(0) + loggedInUser.lastname.charAt(0)} />
                            { subMenuOpen &&
                             <div className={classes.subMenu}>
                                <NavLink to={`/collection/${loggedInUser.id}`}>My Collection</NavLink> 
                                <p onClick={openLogout}>Logout</p>
                            </div>
                            }
                        </li>
                    }
                </ul>
            </nav>
            <nav className={[classes.navMobile, `${navMobileOpen ? 'open' : ''}`].join(' ')}>
                <ul className={classes.navInner}>
                <li className={classes.navItem}>
                        <NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined} onClick={closeMobileNavigation} end >
                            Home
                        </NavLink>
                    </li>
                    <li className={classes.navItem}>
                        <NavLink to='/books' className={({ isActive }) => isActive ? classes.active : undefined} onClick={closeMobileNavigation} >
                            Books
                        </NavLink>
                    </li>
                    { loggedIn === 1 &&
                        <li className={classes.navItem}>
                            <NavLink to='/collections' className={({ isActive }) => isActive ? classes.active : undefined} onClick={closeMobileNavigation} >
                                Collections
                            </NavLink>
                        </li>
                    }
                    { loggedIn !== 1 && 
                        <li className={classes.navItem} onClick={() => {openLogin(); closeMobileNavigation();}} >
                            <p>Login</p>
                        </li>
                    }
                    { loggedIn === 1 && 
                        <li className={classes.navItem} onClick={closeMobileNavigation} >
                            <NavLink to={`/collection/${loggedInUser.id}`}>My Collection</NavLink> 
                        </li>
                    }
                    { loggedIn === 1 && 
                        <li className={classes.navItem} onClick={() => {openLogout(); closeMobileNavigation();}} >
                            <p>Logout</p>
                        </li> 
                    }                    
                </ul>
            </nav>            
        </>
        
    );    
}

export default MainNavigation;