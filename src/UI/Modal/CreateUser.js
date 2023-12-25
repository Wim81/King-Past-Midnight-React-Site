import Modal from "./Modal";
import modalClasses from './Modal.module.css';

import { CtaSecondary, SubmitButton } from '../Buttons';
import { useDispatch } from 'react-redux';
import { useRef, useState } from "react";
import { addUserModalActions } from "../../store/modal-adduser-state-slice";
import { fetchUsersData, addUser } from '../../store/users-actions';

const CreateUser = () => {
    const dispatch = useDispatch();

    const [adminValue, setAdminValue] = useState(false);

    const usernameRef = useRef();
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const passwordRef = useRef();
    const adminRef = useRef();

    let timestamp = null;
    let colour = '';
    let newUserData = {};

    const onSubmitHandler = e => {
        e.preventDefault();
        timestamp = Math.floor(Date.now() / 1000);
        colour = (Math.random() > 0.5) ? 'green' : 'red';
        newUserData = {
            id: timestamp,
            username: usernameRef.current.value,
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            password: passwordRef.current.value,
            admin: adminValue,
            avatarColour: colour
        };
        dispatch(addUser(newUserData));
        dispatch(addUserModalActions.closeAddUserModal());
        dispatch(fetchUsersData());
    }

    const onCancelHandler = e => {
        e.preventDefault();
        dispatch(addUserModalActions.closeAddUserModal());
    }

    const adminClickHandler = e => {
        setAdminValue(e.target.checked);
    }

    let content = <form onSubmit={onSubmitHandler}>
        
        <div className={modalClasses.inputLine}>
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" ref={firstnameRef} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" ref={lastnameRef} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="username">User Name:</label>
            <input type="text" id="username" name="username" ref={usernameRef} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" ref={passwordRef} />
        </div>

        <div className={[modalClasses.inputLine, modalClasses.checkboxLine].join(' ')}>
            <label htmlFor="admin">Admin:</label>
            <input type="checkbox" id="admin" name="admin" ref={adminRef} defaultChecked='' onClick={adminClickHandler} />
        </div> 

        <div className={modalClasses.ctaContainer}>
            <SubmitButton label='add member' className={modalClasses.cta} />
            <CtaSecondary label='cancel' onClick={onCancelHandler} className={modalClasses.cta} />
        </div>

    </form>

    return <Modal title='Add Member' content={content} />
}

export default CreateUser;