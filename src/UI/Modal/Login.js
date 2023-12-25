import Modal from "./Modal";
import modalClasses from './Modal.module.css';

import { CtaSecondary, SubmitButton} from '../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from "react";
import { loginModalActions } from "../../store/modal-login-state-slice";
import { loginStateActions } from "../../store/login-state";

const Login = () => {
    const allUsers = useSelector(state => state.users.users);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const onSubmitHandler = e => {
        e.preventDefault();

        const usernameInputValue = usernameRef.current.value;
        const passwordInputValue = passwordRef.current.value;

        /* login logic with the necessary error message changes along the way */
        if (usernameInputValue === '' || passwordInputValue === '') {
            setErrorMessage("Please enter values in both fields");
        } else {
            setErrorMessage(""); 
            const inputUser = allUsers.find(user => user.username === usernameInputValue);
            
            if (!inputUser) {
                setErrorMessage("This user does not currently exist. Please adjust the username or contact your administrator for assistance.");
            } else {
                if (passwordInputValue !== inputUser.password) {
                    setErrorMessage("The password is incorrect for this user. Please adjust the password or contact your administrator for assistance.")
                } else {
                    // in this case, the user can be logged in
                    localStorage.setItem('isLoggedInUser', JSON.stringify(inputUser));
                    localStorage.setItem('isLoggedIn', 1);
                    dispatch(loginStateActions.login(inputUser));
                    dispatch(loginModalActions.closeLoginModal());
                }
            }
        }
        /* end of login logic */
    }

    const onCancelHandler = e => {
        e.preventDefault();
        dispatch(loginModalActions.closeLoginModal());
    }

    let content = <form onSubmit={onSubmitHandler}>
        
        <div className={modalClasses.inputLine}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" ref={usernameRef} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" ref={passwordRef} />
        </div>

        <div className={[modalClasses.inputLine, modalClasses.errorMessageLine].join(' ')}>
           <p className={modalClasses.errorMessage}>{errorMessage}</p>
        </div>           

        <div className={modalClasses.ctaContainer}>
            <SubmitButton label='login' className={modalClasses.cta} />
            <CtaSecondary label='cancel' onClick={onCancelHandler} className={modalClasses.cta} />
        </div>

    </form>

    return <Modal title='Login' content={content} />
}

export default Login;