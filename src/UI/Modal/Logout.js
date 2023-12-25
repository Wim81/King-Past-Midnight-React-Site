import Modal from "./Modal";
import modalClasses from './Modal.module.css';

import { CtaSecondary, SubmitButton } from '../Buttons';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logoutModalActions } from "../../store/modal-logout-state-slice";
import { loginStateActions } from "../../store/login-state";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = e => {
        e.preventDefault();
        localStorage.removeItem('isLoggedInUser');
        localStorage.setItem('isLoggedIn', 0);
        dispatch(loginStateActions.logout());
        dispatch(logoutModalActions.closeLogoutModal());
        navigate("/");
    }

    const onCancelHandler = e => {
        e.preventDefault();
        dispatch(logoutModalActions.closeLogoutModal());
    }

    let content = <form onSubmit={onSubmitHandler}>

        <div className={modalClasses.ctaContainer}>
            <SubmitButton label='logout' className={modalClasses.cta} />
            <CtaSecondary label='cancel' onClick={onCancelHandler} className={modalClasses.cta} />
        </div>

    </form>

    return <Modal title='Are you sure you want to log out?' content={content} />
}

export default Logout;