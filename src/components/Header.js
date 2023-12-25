import MainNavigation from './MainNavigation';

import classes from './Header.module.css';
import KpmLogo from '../assets/img/kpm-logo.png';

function Header() {
    return (
        <header>
            <div className={classes.headerInner}>
                <div className={classes.headerLogo}>
                    <img src={KpmLogo} alt="logo King Past Midnight" />
                </div>
                <div className={classes.headerNav}>
                    <MainNavigation />
                </div>
            </div>
        </header>
    );
}

export default Header;