import classes from './Burger.module.css';

import  { useSelector, useDispatch } from 'react-redux';
import { navMobileActions } from '../store/nav-mobile-slice';

const Burger = () => {
    const dispatch = useDispatch();
    const navMobileOpen = useSelector(state => state.navMobile.navMobileOpen);

    const toggleNavMobile = () => {
        dispatch(navMobileActions.toggleNavMobile());
    }

    return(
        <div className={classes.burger} onClick={toggleNavMobile}>
            <span className={[classes.line, classes.line1, `${navMobileOpen ? 'cross' : ''}`].join(' ')}></span>
            <span className={[classes.line, classes.line2, `${navMobileOpen ? 'cross' : ''}`].join(' ')}></span>
            <span className={[classes.line, classes.line3, `${navMobileOpen ? 'cross' : ''}`].join(' ')}></span>
        </div>
    )
}

export default Burger;