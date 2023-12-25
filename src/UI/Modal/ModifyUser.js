import Modal from "./Modal";
import modalClasses from './Modal.module.css';

import { CtaSecondary, SubmitButton } from '../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from "react";
import { modifyUserModalActions } from "../../store/modal-modifyuser-state-slice";
import { modifyUser } from '../../store/users-actions';

const ModifyUser = () => {
    const allUsers = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    const [adminValue, setAdminValue] = useState(false);

    const dbRefElement= document.querySelector('#dbref');
    const db_ref = dbRefElement.dataset.dbref; 

    const currentUser = allUsers.find(user => user.db_ref == db_ref);

    const usernameRef = useRef();
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const passwordRef = useRef();
    const adminRef = useRef();

    const avatarColour = currentUser.avatarColour;
    let modifyUserData = {};

    const onSubmitHandler = e => {
        e.preventDefault();     

        modifyUserData = {
            id: currentUser.id,
            db_ref: db_ref,
            username: usernameRef.current.value,
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            password: passwordRef.current.value,
            admin: adminValue,
            avatarColour: avatarColour
        };
        dispatch(modifyUser(modifyUserData));
        dispatch(modifyUserModalActions.closeModifyUserModal());
    }

    const onCancelHandler = e => {
        e.preventDefault();
        dispatch(modifyUserModalActions.closeModifyUserModal());
    }

    const adminClickHandler = e => {
        setAdminValue(e.target.checked);
    }

    let content = <form onSubmit={onSubmitHandler}>
        
        <div className={modalClasses.inputLine}>
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" ref={firstnameRef} defaultValue={currentUser.firstname} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" ref={lastnameRef} defaultValue={currentUser.lastname} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="username">User Name:</label>
            <input type="text" id="username" name="username" ref={usernameRef} defaultValue={currentUser.username} />
        </div>

        <div className={modalClasses.inputLine}>
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" ref={passwordRef} defaultValue={currentUser.password} />
        </div>

        <div className={[modalClasses.inputLine, modalClasses.checkboxLine].join(' ')}>
            <label htmlFor="admin">Admin:</label>
            <input type="checkbox" id="admin" name="admin" ref={adminRef} defaultChecked={ currentUser.admin ? 'checked' : '' } onClick={adminClickHandler} />
        </div>    
    
        <div className={modalClasses.ctaContainer}>
            <SubmitButton label='modify member' className={modalClasses.cta} />
            <CtaSecondary label='cancel' onClick={onCancelHandler} className={modalClasses.cta} />
        </div>

    </form>

    return <Modal title='Modify Member' content={content} />
}

export default ModifyUser;